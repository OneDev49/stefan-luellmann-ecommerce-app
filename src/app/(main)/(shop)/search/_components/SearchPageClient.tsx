'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductCardType } from '@/types/product';

import ProductCard from '@/components/ui/ProductCard';
import SearchFilters from './SearchFilters';
import MobileFilterSidebar from './MobileFilterSidebar';
import clsx from 'clsx';

export interface CategoryFilterItem {
  name: string;
  slug: string;
}

interface SearchPageClientProps {
  allProducts: ProductCardType[];
  brands: string[];
  categories: CategoryFilterItem[];
  searchTerm?: string;
}

const PRODUCTS_PER_PAGE = 24;

type SortOptions =
  | 'newest'
  | 'oldest'
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc';

export default function SearchPageClient({
  allProducts,
  brands,
  categories,
  searchTerm,
}: SearchPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  // Derived State (The URL is the Source of Truth)
  const selectedBrands = useMemo(
    () => new Set(searchParams.getAll('brand')),
    [searchParams]
  );
  const selectedCategory = searchParams.get('category');
  const minPrice = parseFloat(searchParams.get('minPrice') || '0');
  const maxPrice = parseFloat(searchParams.get('maxPrice') || 'Infinity');
  const minRating = parseInt(searchParams.get('minRating') || '0');
  const showOnSaleOnly = searchParams.get('onSale') === 'true';
  const sortBy = (searchParams.get('sort') as SortOptions) || 'newest';

  const [displayCount, setDisplayCount] = useState<number>(PRODUCTS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);

  // URL Update Logic
  const updateUrl = useCallback(
    (updates: Record<string, string | string[] | number | null | boolean>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        // If value is null, empty string, or false, delete the key
        if (
          value === null ||
          value === undefined ||
          value === '' ||
          value === false
        ) {
          params.delete(key);
        }
        // If it's an array (brands), delete existing and append new ones
        else if (Array.isArray(value)) {
          params.delete(key);
          value.forEach((v) => params.append(key, v.toString()));
        }
        // Otherwise set/update the value
        else {
          params.set(key, value.toString());
        }
      });

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams]
  );

  // Handlers passed to child components
  const handleBrandChange = (newBrands: Set<string>) =>
    updateUrl({ brand: newBrands.size > 0 ? Array.from(newBrands) : null });

  const handleCategoryChange = (slug: string | null) =>
    updateUrl({ category: slug });

  const handlePriceChange = (min: number, max: number) =>
    updateUrl({
      minPrice: min > 0 ? min : null,
      maxPrice: max < Infinity ? max : null,
    });

  const handleRatingChange = (rating: number) =>
    updateUrl({ minRating: rating > 0 ? rating : null });

  const handleSaleToggle = (on: boolean) => updateUrl({ onSale: on });

  const handleSortChange = (sort: SortOptions) =>
    updateUrl({ sort: sort === 'newest' ? null : sort });

  // Reset Function
  const handleClearAll = useCallback(() => {
    setDisplayCount(PRODUCTS_PER_PAGE);
    startTransition(() => {
      const params = new URLSearchParams();
      if (searchTerm) params.set('q', searchTerm);

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newUrl, { scroll: false });
    });
  }, [pathname, router, searchTerm]);

  // Filtering & Sorting Logic
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.size > 0) count += selectedBrands.size;
    if (selectedCategory) count += 1;
    if (minPrice > 0 || maxPrice < Infinity) count += 1;
    if (minRating > 0) count += 1;
    if (showOnSaleOnly) count += 1;
    return count;
  }, [
    selectedBrands,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    showOnSaleOnly,
  ]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter((p) =>
        p.categories?.some((cat) => cat.slug === selectedCategory)
      );
    }
    if (selectedBrands.size > 0) {
      filtered = filtered.filter((p) => selectedBrands.has(p.brand));
    }
    if (minPrice > 0 || maxPrice < Infinity) {
      filtered = filtered.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
    }
    if (minRating > 0) {
      filtered = filtered.filter((p) => (p.averageRating || 0) >= minRating);
    }
    if (showOnSaleOnly) {
      filtered = filtered.filter((p) => p.isOnSale);
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
        case 'oldest':
          return (
            new Date(a.createdAt || 0).getTime() -
            new Date(b.createdAt || 0).getTime()
          );
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [
    allProducts,
    selectedBrands,
    selectedCategory,
    showOnSaleOnly,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
  ]);

  // Pagination & Infinite Scroll
  const displayedProducts = useMemo(
    () => filteredAndSortedProducts.slice(0, displayCount),
    [filteredAndSortedProducts, displayCount]
  );
  const hasMore = displayCount < filteredAndSortedProducts.length;

  const loadMore = useCallback(() => {
    if (hasMore) setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE);
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore();
      },
      { threshold: 0.1 }
    );
    const target = observerTarget.current;
    if (target) observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loadMore]);

  const availableBrands = useMemo(() => {
    if (!selectedCategory) return brands;
    const brandsInCategory = new Set(
      allProducts
        .filter((p) =>
          p.categories?.some((cat) => cat.slug === selectedCategory)
        )
        .map((p) => p.brand)
    );
    return brands.filter((b) => brandsInCategory.has(b));
  }, [brands, selectedCategory, allProducts]);

  return (
    <main className='mx-auto max-w-7-xl px-4 sm:px-6 lg:px-8'>
      <div className='border-b border-gray-500 pt-12 pb-3'>
        <h1 className='text-4xl font-bold tracking-tight underline'>
          Products
        </h1>
        <p className='mt-2 text-gray-400'>
          {searchTerm
            ? `Search results for "${searchTerm}"`
            : 'Browse our curated selection of high-performance components.'}
        </p>
      </div>
      <section className='pt-12 pb-24'>
        <div className='flex gap-x-8 gap-y-10'>
          <aside className='hidden lg:block flex-[0_0_270px] border-r-2 border-gray-700 pr-4'>
            <h2 className='text-3xl font-bold'>Search Filters</h2>
            <SearchFilters
              brands={availableBrands}
              categories={categories}
              selectedBrands={selectedBrands}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minRating={minRating}
              showOnSaleOnly={showOnSaleOnly}
              onBrandChange={handleBrandChange}
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
              onRatingChange={handleRatingChange}
              onSaleToggle={handleSaleToggle}
              activeFiltersCount={activeFiltersCount}
              onClearAll={handleClearAll}
            />
          </aside>

          <div
            className={clsx('flex-auto transition-opacity duration-200', {
              'opacity-50 pointer-events-none': isPending,
            })}
          >
            <div className='flex items-center justify-between border-b-2 border-gray-700 pb-4'>
              <div className='sm:flex items-center gap-4'>
                <div className='flex gap-4 sm:block lg:hidden'>
                  <MobileFilterSidebar
                    brands={availableBrands}
                    categories={categories}
                    selectedBrands={selectedBrands}
                    selectedCategory={selectedCategory}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    minRating={minRating}
                    showOnSaleOnly={showOnSaleOnly}
                    onBrandChange={handleBrandChange}
                    onCategoryChange={handleCategoryChange}
                    onPriceChange={handlePriceChange}
                    onRatingChange={handleRatingChange}
                    onSaleToggle={handleSaleToggle}
                    activeFiltersCount={activeFiltersCount}
                    onClearAll={handleClearAll}
                  />
                  <div className='sm:hidden'>
                    <SortDropdown
                      sortBy={sortBy}
                      setSortBy={handleSortChange}
                    />
                  </div>
                </div>
                <p className='text-gray-400 pt-2 sm:pt-0'>
                  {filteredAndSortedProducts.length} Results found
                </p>
              </div>
              <div className='hidden sm:block'>
                <SortDropdown sortBy={sortBy} setSortBy={handleSortChange} />
              </div>
            </div>

            <div className='mt-6 flex flex-wrap lg:justify-start justify-center gap-4 sm:gap-8'>
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant='standard'
                  />
                ))
              ) : (
                <p className='text-gray-400 col-span-full'>
                  No Product found matching your filters
                </p>
              )}
            </div>

            {hasMore && (
              <div
                ref={observerTarget}
                className='mt-8 flex justify-center items-center py-4'
              >
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-green-500' />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function SortDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: SortOptions;
  setSortBy: (sort: SortOptions) => void;
}) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value as SortOptions)}
      className='bg-[#054000] border border-[#007b08] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#085e00] transition-colors'
    >
      <option value='newest'>Newest First</option>
      <option value='oldest'>Oldest First</option>
      <option value='price-asc'>Price: Low to High</option>
      <option value='price-desc'>Price: High to Low</option>
      <option value='name-asc'>Name: A to Z</option>
      <option value='name-desc'>Name: Z to A</option>
    </select>
  );
}
