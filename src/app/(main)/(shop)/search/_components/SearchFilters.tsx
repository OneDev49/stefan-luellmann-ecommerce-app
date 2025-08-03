'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CategoryFilterItem } from './SearchPageClient';

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
    const brands = new Set(searchParams.getAll('brand'));
    const category = searchParams.get('category');
    return { brands, category };
  });

  useEffect(() => {
    const params = new URLSearchParams();

    activeFilters.brands.forEach((brand) => params.append('brand', brand));

    if (activeFilters.category) {
      params.set('category', activeFilters.category);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [activeFilters, pathname, router]);

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

  return (
    <form className='space-y-8'>
      {/* Filter for Categories */}
      <fieldset>
        <legend className='block text-lg font-bold text-white mb-3'>
          Category
        </legend>
        <div className='space-y-2'>
          {categories.map((category) => (
            <button
              key={category.slug}
              type='button'
              onClick={() => handleCategoryChange(category.slug)}
              className={`block w-full text-left p-2 rounded ${
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

      {/* Filter for Brands */}
      <fieldset>
        <legend className='block text-lg font-bold text-white mb-3'>
          Brands
        </legend>
        <div className='space-y-2'>
          {brands.map((brand) => (
            <div key={brand} className='flex items-center'>
              <input
                id={`brand-${brand}`}
                type='checkbox'
                checked={activeFilters.brands.has(brand)}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className='h-4 w-4 rounded border-gray-600 bg-gray-800 text-green-500 focus:ring-green-500'
              />
              <label
                htmlFor={`brand-${brand}`}
                className='ml-3 text-sm text-gray-300'
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
