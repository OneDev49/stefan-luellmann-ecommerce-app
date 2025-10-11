'use client';

import { useEffect, useState } from 'react';
import { CategoryFilterItem } from './SearchPageClient';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import SearchFilters from './SearchFilters';
import FilterIcon from '@/components/icons/ecommerce/FilterIcon';

interface MobileFilterSidebarProps {
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
  activeFiltersCount: number;
}

export default function MobileFilterSidebar({
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
}: MobileFilterSidebarProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpenSidebar = () => {
    setIsClosing(false);
    setIsOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseSidebar();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <>
      <Button
        as='button'
        type='button'
        onClick={handleOpenSidebar}
        variant='free'
        className='bg-[#054000] border border-[#007b08] text-white p-2 rounded-lg cursor-pointer hover:bg-[#085e00] transition-colors flex items-center gap-2'
      >
        <FilterIcon />
        <span>
          Filters
          {activeFiltersCount > 0 && ` ( ${activeFiltersCount} )`}
        </span>
      </Button>

      {isOpen && (
        <>
          <div
            onClick={handleCloseSidebar}
            className={clsx(
              'fixed inset-0 bg-black/60 z-[99] lg:hidden',
              isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
            )}
            aria-hidden='true'
          />
          <div
            onClick={(e) => e.stopPropagation()}
            className={clsx(
              'fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[#001a00] z-[99] overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out lg:hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500 border-r border-[#004810]',
              isClosing ? 'animate-slideOutToLeft' : 'animate-slideInFromLeft'
            )}
          >
            <div className='sticky top-0 bg-[#001a00] border-b border-gray-700 p-4 flex items-center justify-between z-10'>
              <h2 className='text-2xl font-bold text-white'>Filters</h2>
              <Button
                as='button'
                type='button'
                onClick={handleCloseSidebar}
                variant='danger'
                position='card'
              >
                <CloseIcon />
              </Button>
            </div>
            <div className='p-4'>
              <SearchFilters
                brands={brands}
                categories={categories}
                selectedBrands={selectedBrands}
                selectedCategory={selectedCategory}
                minPrice={minPrice}
                maxPrice={maxPrice}
                minRating={minRating}
                showOnSaleOnly={showOnSaleOnly}
                onBrandChange={onBrandChange}
                onCategoryChange={onCategoryChange}
                onPriceChange={onPriceChange}
                onRatingChange={onRatingChange}
                onSaleToggle={onSaleToggle}
                activeFiltersCount={activeFiltersCount}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
