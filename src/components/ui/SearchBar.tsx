/* 'use client';

import { useState, useEffect } from 'react';
import { Product } from '@prisma/client';
import Link from 'next/link';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      const searchResults = allMockProducts.filter((product) =>
        product.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleResultClick = () => {
    setQuery('');
    setResults([]);
  };

  return (
    <div className='relative flex-1 max-w-xl'>
      <input
        name='ProductSearch'
        type='text'
        placeholder='Search for Products...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='w-full p-2 rounded-3xl bg-gray-700 text-white'
      />

      {results.length > 0 && (
        <ul className='absolute top-full left-0 w-full bg-gray-800 border border-gray-700 rounded-b-lg shadow-lg z-20'>
          {results.slice(0, 5).map((product) => (
            <li key={product.id}>
              <Link
                href={`/product/${product.slug}`}
                className='block p-2 hover:bg-gray-700'
                onClick={handleResultClick}
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 */
