'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';

import FolderIcon from '@/components/icons/ecommerce/FolderIcon';
import TagIcon from '@/components/icons/ecommerce/TagIcon';
import SearchIcon from '@/components/icons/ui/SearchIcon';
import Link from 'next/link';

interface SearchSuggestion {
  type: 'product' | 'category' | 'brand';
  name: string;
  slug?: string;
  link: string;
}

interface HeaderSearchBarProps {
  categories?: Array<{ name: string; slug: string }>;
  popularBrands?: string[];
}

export default function HeaderSearchBar({
  categories = [],
  popularBrands = [],
}: HeaderSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close suggestions when user clicks outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Generate suggestions based on user Input
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const newSuggestions: SearchSuggestion[] = [];

    categories.forEach((cat) => {
      if (cat.name.toLowerCase().includes(query)) {
        newSuggestions.push({
          type: 'category',
          name: cat.name,
          slug: cat.slug,
          link: `/search?category=${cat.slug}`,
        });
      }
    });

    popularBrands.forEach((brand) => {
      if (brand.toLowerCase().includes(query)) {
        newSuggestions.push({
          type: 'brand',
          name: brand,
          link: `/search?brand=${encodeURIComponent(brand)}`,
        });
      }
    });

    setSuggestions(newSuggestions.slice(0, 6));
  }, [searchQuery, categories, popularBrands]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();

    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setShowSuggestions(false);
    } else {
      router.push('/search');
    }
  };

  const handleSuggestionClick = () => {
    setShowSuggestions(false);
    setSearchQuery('');
  };

  return (
    <div
      ref={wrapperRef}
      className='relative w-full max-w-3xl border border-[#009605] rounded-lg bg-[#054000]'
    >
      <form onSubmit={handleSubmit} className='relative'>
        <div className='absolute left-0 top-0 bottom-0 h-full grid place-items-center  border-r border-[#009605]'>
          <button
            type='submit'
            aria-label='Search'
            className='bg-black block h-full w-full px-4 hover:bg-[#374151] transition-colors rounded-tl-lg rounded-bl-lg'
          >
            <SearchIcon height={24} width={24} />
          </button>
        </div>

        <input
          type='text'
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder='Search Products, Categories, Brands and more!'
          className='w-full pl-16 py-2 pr-12 bg-[#054000] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#00ff11] transition-colors'
        />
      </form>

      {/* Suggestions Dropdown on User Input */}
      {showSuggestions && suggestions.length > 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-[#054000] border border-[#007b08] rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto'>
          {suggestions.map((suggestion, index) => (
            <Link
              key={`${suggestion.type}-${index}`}
              href={suggestion.link}
              onClick={handleSuggestionClick}
              className='block px-4 py-3 hover:bg-[#085e00] transition-colors border-b border-[#007b08] last:border-b-0'
            >
              <div className='flex items-center gap-3'>
                {suggestion.type === 'category' && (
                  <span className='text-xl'>
                    <FolderIcon />
                  </span>
                )}
                {suggestion.type === 'brand' && (
                  <span className='text-xl'>
                    <TagIcon />
                  </span>
                )}
                <div>
                  <p className='text-white'>{suggestion.name}</p>
                  <p className='text-xs text-gray-400 capitalize'>
                    {suggestion.type}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No Result message */}
      {showSuggestions && searchQuery && suggestions.length === 0 && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-[#054000] border border-[#007b08] rounded-lg shadow-lg z-50 p-4'>
          <p className='text-gray-400 text-sm'>
            No suggestions found. Enter to search for "{searchQuery}"
          </p>
        </div>
      )}
    </div>
  );
}
