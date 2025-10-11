import HeaderContent, { HeaderVariant } from './_components/HeaderContent';
import { getAllBrands, getAllCategories } from '@/lib/data/products';

interface HeaderLayoutProps {
  variant: HeaderVariant;
}

export default async function HeaderLayout({ variant }: HeaderLayoutProps) {
  const [categories, popularBrands] = await Promise.all([
    getAllCategories(),
    getAllBrands(),
  ]);

  return (
    <header className='sticky top-0 z-[99] left-0 right-0 bg-black'>
      <HeaderContent
        headerVariant={variant}
        categories={categories}
        popularBrands={popularBrands}
      />
    </header>
  );
}
