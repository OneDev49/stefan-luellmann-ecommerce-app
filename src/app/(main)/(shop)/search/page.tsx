import { mapToProductCard } from '@/lib/mappers/product';
import { Metadata } from 'next';
import {
  getAllBrands,
  getAllCategories,
  getAllProductsForSearch,
} from '@/lib/data/products';

import SearchPageClient from './_components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Find the Computer Components you are looking for among hundrets of premium components. From GPU to CPU and even Case Fans, we have everything for your Computer.',

  openGraph: {
    title: 'Search',
    description:
      'Find the Computer Components you are looking for among hundrets of premium components. From GPU to CPU and even Case Fans, we have everything for your Computer.',
  },

  twitter: {
    title: 'Search',
    description:
      'Find the Computer Components you are looking for among hundrets of premium components. From GPU to CPU and even Case Fans, we have everything for your Computer.',
  },
};

type SearchParams = {
  q?: string;
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchTerm = searchParams.q;

  // Single DB Query to fetch all matching products at once
  const [allProductsDB, allCategories, allBrands] = await Promise.all([
    getAllProductsForSearch(searchTerm),
    getAllCategories(),
    getAllBrands(),
  ]);

  const allProducts = allProductsDB.map(mapToProductCard);

  return (
    <SearchPageClient
      allProducts={allProducts}
      brands={allBrands}
      categories={allCategories}
      searchTerm={searchTerm}
    />
  );
}
