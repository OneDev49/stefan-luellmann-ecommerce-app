'use client';

import { Product } from '@prisma/client';
import ProductCard from '@/components/ui/ProductCard';
import SearchFilters from './SearchFilters';

export interface CategoryFilterItem {
  name: string;
  slug: string;
}

interface SearchPageClientProps {
  initialProducts: Product[];
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
      <div className='border-b border-gray-700 pt-12 pb-6'>
        <h1 className='text-4xl font-bold tracking-tight text-white'>
          Products
        </h1>
        <p className='mt-4 text-gray-400'>
          Browse our curated selection of high-performance components.
        </p>
      </div>
      <section className='pt-12 pb-24'>
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
          <aside className='hidden lg:block'>
            <h2 className='sr-only'>Filters</h2>
            <SearchFilters brands={brands} categories={categories} />
          </aside>
          <div className='lg:col-span-3'>
            <div className='flex items-center justify-between border-b border-gray-700 pb-4'>
              <p className='text-gray-400'>{initialProducts.length} Results</p>
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
