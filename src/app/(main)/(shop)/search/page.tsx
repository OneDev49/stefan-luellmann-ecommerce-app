import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { mapToProductCard } from '@/lib/mappers/product';

import SearchPageClient from './_components/SearchPageClient';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selectedBrands = Array.isArray(searchParams.brand)
    ? searchParams.brand
    : typeof searchParams.brand === 'string'
    ? [searchParams.brand]
    : [];

  const categorySlug =
    typeof searchParams.category === 'string'
      ? searchParams.category
      : undefined;
  const searchTerm =
    typeof searchParams.q === 'string' ? searchParams.q : undefined;

  /* Construct the where object */
  const where: Prisma.ProductWhereInput = {};
  if (searchTerm) {
    where.name = {
      contains: searchTerm,
      mode: 'insensitive',
    };
  }
  if (categorySlug) {
    where.categories = {
      some: {
        slug: {
          equals: categorySlug,
          mode: 'insensitive',
        },
      },
    };
  }
  if (selectedBrands.length > 0) {
    where.brand = {
      in: selectedBrands,
      mode: 'insensitive',
    };
  }

  const baseWhereClause = { ...where };
  delete baseWhereClause.brand;

  const [initialProductsDB, availableBrands, allCategories] = await Promise.all(
    [
      prisma.product.findMany({
        where,
        take: 50,
      }),

      prisma.product.findMany({
        where: baseWhereClause,
        select: {
          brand: true,
        },
        distinct: ['brand'],
      }),

      prisma.category.findMany({ select: { name: true, slug: true } }),
    ]
  );

  const initialProducts = initialProductsDB.map(mapToProductCard);

  return (
    <SearchPageClient
      initialProducts={initialProducts}
      brands={availableBrands.map((b) => b.brand).sort()}
      categories={allCategories}
    />
  );
}
