'use client';

import { useState } from 'react';
import { CategoryFilterItem } from './SearchPageClient';

import clsx from 'clsx';
import TagIcon from '@/components/icons/ecommerce/TagIcon';
import Button from '@/components/ui/Button';
import TrashIcon from '@/components/icons/ecommerce/TrashIcon';
import StarIcon from '@/components/icons/ecommerce/StarIcon';

interface SearchFiltersProps {
  brands: string[];
  categories: CategoryFilterItem[];
  selectedBrands: Set<string>;
  selectedCategory: string | null;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  showOnSaleOnly: boolean;
  onBrandChange: (brands: Set<string>) => void;
  onCategoryChange: (category: string | null) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  onSaleToggle: (showOnSale: boolean) => void;
  activeFiltersCount?: number;
}

export default function SearchFilters({
  brands,
  categories,
  selectedBrands,
  selectedCategory,
  minPrice,
  maxPrice,
  minRating,
  showOnSaleOnly,
  onBrandChange,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onSaleToggle,
  activeFiltersCount,
}: SearchFiltersProps) {
  const [priceMin, setPriceMin] = useState(
    minPrice > 0 ? minPrice.toString() : ''
  );
  const [priceMax, setPriceMax] = useState(
    maxPrice < Infinity ? maxPrice.toString() : ''
  );

  const handleBrandChange = (brand: string, isChecked: boolean) => {
    const newBrands = new Set(selectedBrands);
    if (isChecked) {
      newBrands.add(brand);
    } else {
      newBrands.delete(brand);
    }
    onBrandChange(newBrands);
  };

  const handleCategoryChange = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      onCategoryChange(null);
    } else {
      onCategoryChange(categorySlug);
    }
  };

  const handlePriceBlur = () => {
    const min = parseFloat(priceMin) || 0;
    const max = parseFloat(priceMax) || Infinity;
    onPriceChange(min, max);
  };

  const clearAllFilters = () => {
    onBrandChange(new Set());
    onCategoryChange(null);
    onPriceChange(0, Infinity);
    onRatingChange(0);
    onSaleToggle(false);
    setPriceMin('');
    setPriceMax('');
  };

  const hasActiveFilters =
    selectedBrands.size > 0 ||
    selectedCategory !== null ||
    minPrice > 0 ||
    maxPrice < Infinity ||
    minRating > 0 ||
    showOnSaleOnly;

  const headingsClassNames = clsx(
    'block text-xl font-bold text-white font-headings'
  );

  return (
    <div className='space-y-8 my-6'>
      {/* Clear button for all filters */}
      {hasActiveFilters ? (
        <Button
          as='button'
          type='button'
          onClick={clearAllFilters}
          position='card'
          variant='danger'
          className='w-full justify-center'
        >
          <TrashIcon height={20} width={20} />
          Clear All Filters
          {activeFiltersCount && ` ( ${activeFiltersCount} )`}
        </Button>
      ) : (
        <div className='text-center border-b border-t border-gray-500 text-gray-400 py-1'>
          No Filter Selected
        </div>
      )}

      {/* Category Filter */}
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
                selectedCategory === category.slug
                  ? 'bg-[#0c8b00] border-[#00ff11]'
                  : 'bg-[#054000] border-[#007b08]'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Sale Filter */}
      <fieldset className='space-y-2'>
        <div>
          <legend className={headingsClassNames}>Special Offers</legend>
          <hr className='w-[50%] border-gray-500' />
        </div>
        <button
          type='button'
          onClick={() => onSaleToggle(!showOnSaleOnly)}
          className={clsx(
            'w-full py-2 px-3 border rounded-lg transition-colors text-left flex items-center justify-between',
            showOnSaleOnly
              ? 'bg-[#0c8b00] border-[#00ff11]'
              : 'bg-[#054000] border-[#007b08] hover:bg-[#085e00]'
          )}
        >
          <span className='flex items-center gap-2'>
            <span className='text-2xl'>
              <TagIcon />
            </span>
            <span>On Sale Only</span>
          </span>
          {showOnSaleOnly && (
            <span className='text-green-400 font-bold'>✓</span>
          )}
        </button>
      </fieldset>

      {/* Price Filter */}
      <fieldset className='space-y-2'>
        <div>
          <legend className={headingsClassNames}>Price Range (€)</legend>
          <hr className='w-[50%] border-gray-500' />
        </div>
        <div className='flex gap-2 items-center'>
          <input
            type='number'
            placeholder='Min'
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value)}
            onBlur={handlePriceBlur}
            className='w-full px-3 py-1 bg-[#054000] border border-[#007b08] rounded-lg text-white focus:outline-none focus:border-[#00ff11] transition-colors'
          />
          <span className='text-gray-400'>-</span>
          <input
            type='number'
            placeholder='Max'
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value)}
            onBlur={handlePriceBlur}
            className='w-full px-3 py-1 bg-[#054000] border border-[#007b08] rounded-lg text-white focus:outline-none focus:border-[#00ff11] transition-colors'
          />
        </div>
      </fieldset>

      {/* Rating Filter */}
      <fieldset className='space-y-2'>
        <div>
          <legend className={headingsClassNames}>Minimum Rating</legend>
          <hr className='w-[50%] border-gray-500' />
        </div>
        <div className='space-y-2'>
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              type='button'
              onClick={() => onRatingChange(rating === minRating ? 0 : rating)}
              className={clsx(
                'w-full py-2 px-3 border rounded-lg transition-colors text-left flex items-center gap-2',
                minRating === rating
                  ? `bg-[#0c8b00] border-[#00ff11]`
                  : 'bg-[#054000] border-[#007b08] hover:bg-[#085e00]'
              )}
            >
              <span className='flex items-center'>
                {Array.from({ length: rating }).map((_, i) => (
                  <span key={i} className='text-[#00ff11]'>
                    <StarIcon height={20} width={20} />
                  </span>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <span key={i} className='text-gray-500'>
                    <StarIcon height={20} width={20} />
                  </span>
                ))}
              </span>
              <span className='text-sm text-gray-300'>& Up</span>
            </button>
          ))}
        </div>
      </fieldset>

      {/* Brands Filter */}
      {brands && brands.length > 0 && (
        <fieldset className='space-y-2'>
          <div>
            <legend className={headingsClassNames}>
              Brands
              {selectedBrands.size > 0 && (
                <span className='ml-2 text-sm text-green-400'>
                  ({selectedBrands.size} selected)
                </span>
              )}
            </legend>
            <hr className='w-[50%] border-gray-500' />
          </div>
          <div className='space-y-2 max-h-72 overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-green-500'>
            {brands.map((brand) => (
              <div key={brand} className='flex items-center gap-1'>
                <input
                  id={`brand-${brand}`}
                  type='checkbox'
                  checked={selectedBrands.has(brand)}
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
    </div>
  );
}
