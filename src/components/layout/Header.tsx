import { cache } from 'react';
import HeaderContent, { HeaderVariant } from './_components/HeaderContent';
import { prisma } from '@/lib/prisma';

interface HeaderLayoutProps {
  variant: HeaderVariant;
}

const getCategories = cache(async () => {
  return prisma.category.findMany({
    select: { name: true, slug: true },
    orderBy: { name: 'asc' },
  });
});

const getPopularBrands = cache(async () => {
  const brands = await prisma.product.findMany({
    select: { brand: true },
    distinct: ['brand'],
    orderBy: { brand: 'asc' },
  });
  return brands.map((b) => b.brand);
});

export default async function HeaderLayout({ variant }: HeaderLayoutProps) {
  const [categories, popularBrands] = await Promise.all([
    getCategories(),
    getPopularBrands(),
  ]);

  return (
    <header className='sticky top-0 z-20 left-0 right-0 bg-black'>
      <HeaderContent
        headerVariant={variant}
        categories={categories}
        popularBrands={popularBrands}
      />
    </header>
  );
}
