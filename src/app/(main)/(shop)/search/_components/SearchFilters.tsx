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

  const headingsClassNames = clsx(
    'block text-2xl font-bold text-white mb-3 font-headings px-4'
  );

  return (
    <form className='space-y-4'>
      {/* Filter for Categories */}
      <fieldset>
        <legend className={headingsClassNames}>Category</legend>
        <div className='space-y-1'>
          {categories.map((category) => (
            <button
              key={category.slug}
              type='button'
              onClick={() => handleCategoryChange(category.slug)}
              className={`block w-full text-left px-4 py-1 rounded ${
                activeFilters.category === category.slug
                  ? 'bg-green-500 text-black font-bold'
                  : 'hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </fieldset>

      <hr />

      {/* Filter for Brands */}
      <fieldset>
        <legend className={headingsClassNames}>Brands</legend>
        <div className='space-y-2'>
          {brands.map((brand) => (
            <div key={brand} className='flex items-center px-4'>
              <input
                id={`brand-${brand}`}
                type='checkbox'
                checked={activeFilters.brands.has(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className='h-4 w-4 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500 cursor-pointer'
              />
              <label
                htmlFor={`brand-${brand}`}
                className='ml-3 text-sm text-gray-300 cursor-pointer'
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </form>
  );
}
