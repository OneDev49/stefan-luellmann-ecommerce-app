'use client';

import { ProductCardType } from '@/types/product';

import ProductCard from '@/components/ui/ProductCard';
import SearchFilters from './SearchFilters';

export interface CategoryFilterItem {
  name: string;
  slug: string;
}

interface SearchPageClientProps {
  initialProducts: ProductCardType[];
  brands: string[];
  categories: CategoryFilterItem[];
}

export default function SearchPageClient({
  initialProducts,
  brands,
  categories,
}: SearchPageClientProps) {
  return (
    <main className='mx-auto max-w-7-xl px-4 sm:px-6 lg:px-8'>
      <div className='border-b border-gray-500 pt-12 pb-3'>
        <h1 className='text-4xl font-bold tracking-tight underline'>
          Products
        </h1>
        <p className='mt-2 text-gray-400'>
          Browse our curated selection of high-performance components.
        </p>
      </div>
      <section className='pt-12 pb-24'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6'>
          <aside className='hidden lg:block border-r-2 border-gray-700 pr-4 lg:col-span-1'>
            <div>
              <h2 className='text-3xl font-bold'>Search Filters</h2>
              <p className='text-gray-400'>
                Find the Product you search using our Product Filters.
              </p>
            </div>
            <SearchFilters brands={brands} categories={categories} />
          </aside>
          <div className='lg:col-span-5'>
            <div className='flex items-center justify-between border-b-2 border-gray-700 pb-4'>
              <p className='text-gray-400'>
                {initialProducts.length} Results found matching the Search
              </p>
              {/* TODO: Build SortDropdown component that uses 'sortBy' and 'setSortBy' */}
            </div>
            <div className='mt-6 flex flex-wrap gap-8'>
              {initialProducts.length > 0 ? (
                initialProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    variant='standard'
                  />
                ))
              ) : (
                <p className='text-gray-400 col-span-full'>No Product found</p>
              )}
            </div>

            {/* TODO: Add Pagination controls */}
          </div>
        </div>
      </section>
    </main>
  );
}
