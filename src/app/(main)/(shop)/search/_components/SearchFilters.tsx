'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CategoryFilterItem } from './SearchPageClient';

import clsx from 'clsx';

interface SearchFiltersProps {
  brands: string[];
  categories: CategoryFilterItem[];
}

interface FilterState {
  brands: Set<string>;
  category: string | null;
}

export default function SearchFilters({
  brands,
  categories,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeFilters, setActiveFilters] = useState<FilterState>(() => {
    const urlBrands = new Set(searchParams.getAll('brand'));
    const urlCategory = searchParams.get('category');
    return { brands: urlBrands, category: urlCategory };
  });

  useEffect(() => {
    const params = new URLSearchParams();

    activeFilters.brands.forEach((brand) => params.append('brand', brand));

    if (activeFilters.category) {
      params.set('category', activeFilters.category);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [activeFilters, pathname, router]);

  useEffect(() => {
    const urlBrands = new Set(searchParams.getAll('brand'));
    const urlCategory = searchParams.get('category');
    setActiveFilters({ brands: urlBrands, category: urlCategory });
  }, [searchParams]);

  const handleBrandChange = useCallback((brand: string, isChecked: boolean) => {
    setActiveFilters((prevFilters) => {
      const newBrands = new Set(prevFilters.brands);
      if (isChecked) {
        newBrands.add(brand);
      } else {
        newBrands.delete(brand);
      }
      return { ...prevFilters, brands: newBrands };
    });
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      category: prevFilters.category === category ? null : category,
      brands: new Set(),
    }));
  }, []);

  /* CSS Classnames */
  const headingsClassNames = clsx(
    'block text-xl font-bold text-white font-headings'
  );

  return (
    <form className='space-y-8 my-6'>
      {/* Filter for Categories */}
      <fieldset className='space-y-2'>
        <div>
          <legend className={headingsClassNames}>Category</legend>
          <hr className='w-[50%] border-gray-500' />
        </div>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <button
              key={category.slug}
              type='button'
              onClick={() => handleCategoryChange(category.slug)}
              className={clsx(
                `py-1 px-2  border  text-left rounded-lg transition-colors hover:bg-[#085e00]`,
                activeFilters.category === category.slug
                  ? 'bg-[#0c8b00] border-[#00ff11]'
                  : 'bg-[#054000] border-[#007b08]'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </fieldset>
      {/* Filter for Brands */}
      {brands && brands.length > 0 && (
        <fieldset className='space-y-2'>
          <div>
            <legend className={headingsClassNames}>Brands</legend>
            <hr className='w-[50%] border-gray-500' />
          </div>
          <div className='space-y-2 max-h-72 overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-green-500'>
            {brands.map((brand) => (
              <div key={brand} className='flex items-center gap-1'>
                <input
                  id={`brand-${brand}`}
                  type='checkbox'
                  checked={activeFilters.brands.has(brand)}
                  onChange={(e) => handleBrandChange(brand, e.target.checked)}
                  className='h-4 w-4 text-green-500 focus:ring-green-500 cursor-pointer'
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className=' text-sm cursor-pointer'
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </fieldset>
      )}
    </form>
  );
}
