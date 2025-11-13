'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ProductCardType } from '@/types/product';

import ProductCard from '@/components/ui/ProductCard';
import SearchFilters from './SearchFilters';
import MobileFilterSidebar from './MobileFilterSidebar';

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

  // Initialize states from Url params
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(() => {
    return new Set(searchParams.getAll('brand'));
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    () => {
      return searchParams.get('category');
    }
  );

  const [minPrice, setMinPrice] = useState<number>(() => {
    const price = searchParams.get('minPrice');
    return price ? parseFloat(price) : 0;
  });

  const [maxPrice, setMaxPrice] = useState<number>(() => {
    const price = searchParams.get('maxPrice');
    return price ? parseFloat(price) : Infinity;
  });

  const [minRating, setMinRating] = useState<number>(() => {
    const rating = searchParams.get('minRating');
    return rating ? parseInt(rating) : 0;
  });

  const [showOnSaleOnly, setShowOnSaleOnly] = useState<boolean>(() => {
    return searchParams.get('onSale') === 'true';
  });

  const [sortBy, setSortBy] = useState<SortOptions>(() => {
    const sort = searchParams.get('sort');
    return (sort as SortOptions) || 'newest';
  });

  const [displayCount, setDisplayCount] = useState<number>(PRODUCTS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Calculate active filter count
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

  // Sync state to Url on filter change
  useEffect(() => {
    const params = new URLSearchParams();

    // Preserving the base search term
    if (searchTerm) {
      params.set('q', searchTerm);
    }

    // Add specific Url params of filters
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    selectedBrands.forEach((brand) => {
      params.append('brand', brand);
    });

    if (minPrice > 0) {
      params.set('minPrice', minPrice.toString());
    }
    if (maxPrice < Infinity) {
      params.set('maxPrice', maxPrice.toString());
    }

    if (minRating > 0) {
      params.set('minRating', minRating.toString());
    }

    if (showOnSaleOnly) {
      params.set('onSale', 'true');
    }

    if (sortBy !== 'newest') {
      params.set('sort', sortBy);
    }

    // Update Url without triggering navigation
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    selectedBrands,
    selectedCategory,
    showOnSaleOnly,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    searchTerm,
    pathname,
    router,
  ]);

  // Sync Url changes back to state to allow browser back/forward
  useEffect(() => {
    setSelectedBrands(new Set(searchParams.getAll('brand')));
    setSelectedCategory(searchParams.get('category'));

    const urlMinPrice = searchParams.get('minPrice');
    setMinPrice(urlMinPrice ? parseFloat(urlMinPrice) : 0);

    const urlMaxPrice = searchParams.get('maxPrice');
    setMaxPrice(urlMaxPrice ? parseFloat(urlMaxPrice) : Infinity);

    const urlMinRating = searchParams.get('minRating');
    setMinRating(urlMinRating ? parseInt(urlMinRating) : 0);

    setShowOnSaleOnly(searchParams.get('onSale') === 'true');

    const urlSort = searchParams.get('sort');
    setSortBy((urlSort as SortOptions) || 'newest');
  }, [searchParams]);

  const handlePriceChange = useCallback((min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  // Client-side filtering and sorting made to not use any Vercel/Supabase Resources for the Portfolio Project
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts;

    // Category Filter
    if (selectedCategory) {
      filtered = filtered.filter((product) =>
        product.categories?.some((cat) => cat.slug === selectedCategory)
      );
    }

    // Brand Filter
    if (selectedBrands.size > 0) {
      filtered = filtered.filter((product) =>
        selectedBrands.has(product.brand)
      );
    }

    // Price Filter
    if (minPrice > 0 || maxPrice < Infinity) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Rating Filter
    if (minRating > 0) {
      filtered = filtered.filter((product) => {
        const rating = product.averageRating || 0;
        return rating >= minRating;
      });
    }

    // Sale Filter
    if (showOnSaleOnly) {
      filtered = filtered.filter((product) => product.isOnSale);
    }

    // Product Sort
    const sorted = [...filtered].sort((a, b) => {
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

    return sorted;
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

  // Infinite Scroll Pagination
  const displayedProducts = useMemo(
    () => filteredAndSortedProducts.slice(0, displayCount),
    [filteredAndSortedProducts, displayCount]
  );

  const hasMore = displayCount < filteredAndSortedProducts.length;

  // Reset Display Count when Filters change
  useEffect(() => {
    setDisplayCount(PRODUCTS_PER_PAGE);
  }, [selectedBrands, selectedCategory, minPrice, maxPrice, minRating, sortBy]);

  // IntersectionObserver for Infinite scroll
  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE);
    }
  }, [hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadMore]);

  // Available Brands for current Category (for Filter Display)
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
            <div>
              <h2 className='text-3xl font-bold'>Search Filters</h2>
              <p className='text-gray-400'>
                Find the Product you search using our Product Filters.
              </p>
            </div>
            <SearchFilters
              brands={availableBrands}
              categories={categories}
              selectedBrands={selectedBrands}
              selectedCategory={selectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              minRating={minRating}
              showOnSaleOnly={showOnSaleOnly}
              onBrandChange={setSelectedBrands}
              onCategoryChange={setSelectedCategory}
              onPriceChange={handlePriceChange}
              onRatingChange={setMinRating}
              onSaleToggle={setShowOnSaleOnly}
              activeFiltersCount={activeFiltersCount}
            />
          </aside>
          <div className='flex-auto'>
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
                    onBrandChange={setSelectedBrands}
                    onCategoryChange={setSelectedCategory}
                    onPriceChange={handlePriceChange}
                    onRatingChange={setMinRating}
                    onSaleToggle={setShowOnSaleOnly}
                    activeFiltersCount={activeFiltersCount}
                  />
                  <div className='sm:hidden'>
                    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
                  </div>
                </div>

                <p className='text-gray-400 pt-2 sm:pt-0'>
                  {filteredAndSortedProducts.length} Results found
                  {displayedProducts.length <
                    filteredAndSortedProducts.length &&
                    ` (showing ${displayedProducts.length})`}
                </p>
              </div>
              <div className='hidden sm:block'>
                <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
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

            {!hasMore && displayedProducts.length > 0 && (
              <p className='text-center text-gray-500 mt-8'>
                You&apos;ve reached the end of the results
              </p>
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
      <option value='price-desc'>Prise: High to Low</option>
      <option value='name-asc'>Name: A to Z</option>
      <option value='name-desc'>Name: Z to A</option>
    </select>
  );
}
