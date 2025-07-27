import { findManyProducts, findUniqueProduct } from '@/lib/mock-data';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import MainSection from './_components/MainSection';
import DescriptionSection from './_components/DescriptionSection';
import ProductCarousel from '@/components/sections/ProductCarousel';

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await findUniqueProduct({ where: { slug: params.slug } });

  if (!product) {
    notFound();
  }

  const mainWrapperClassNames = clsx('py-16 flex flex-col gap-16');

  const similarProducts = await findManyProducts({
    where: { brand: product.brand },
  });

  return (
    <main className='bg-[linear-gradient(180deg,#004505,#000)]'>
      <div className={mainWrapperClassNames}>
        <MainSection productItem={product} />
        <DescriptionSection productItem={product} />
        <div>
          <ProductCarousel
            heading={`More from ${product.brand}`}
            productCardVariant='standard'
            products={similarProducts}
            position='productpage'
            bgColor=''
          />
        </div>
      </div>
    </main>
  );
}
