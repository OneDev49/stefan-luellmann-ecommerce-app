import { prisma } from '@/lib/prisma';
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

  const [allBrands, allCategories] = await Promise.all([
    prisma.product.findMany({
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    }),
    prisma.category.findMany({
      select: { name: true, slug: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  const initialProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive',
      },

      categories: categorySlug
        ? {
            some: {
              slug: {
                equals: categorySlug,
                mode: 'insensitive',
              },
            },
          }
        : undefined,

      brand:
        selectedBrands.length > 0
          ? {
              in: selectedBrands,
              mode: 'insensitive',
            }
          : undefined,
    },
    take: 50,
  });

  return (
    <SearchPageClient
      initialProducts={initialProducts}
      brands={allBrands.map((b) => b.brand)}
      categories={allCategories}
    />
  );
}
