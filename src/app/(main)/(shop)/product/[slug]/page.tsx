import { prisma } from '@/lib/prisma';
import clsx from 'clsx';
import { notFound } from 'next/navigation';

import MainSection from './_components/MainSection';
import DescriptionSection from './_components/DescriptionSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import RatingSummary from './_components/RatingSummarySection';
import CustomerReviewSection from './_components/CustomerReviewSection';
import BreadcrumbsSection from './_components/BreadcrumbsSection';

import { mapToProductCard, mapToProductPage } from '@/lib/mappers/product';

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  /* Prisma Query to DB */
  const productDb = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  /* NotFound when no DB */
  if (!productDb) notFound();

  /* Mapping to proper Type */
  const product = mapToProductPage(productDb);

  /* Carousel consts */
  const [brandProductsDb, similarProductsDb] = await Promise.all([
    prisma.product.findMany({
      where: { brand: product.brand, id: { not: product.id } },
      take: 7,
    }),
    prisma.product.findMany({
      where: {
        productType: product.productType,
        brand: { not: product.brand },
      },
      take: 7,
    }),
  ]);
  const brandProducts = brandProductsDb.map(mapToProductCard);
  const similarProducts = similarProductsDb.map(mapToProductCard);

  /* CSS Classes */
  const mainWrapperClassName = clsx('pt-8 pb-16 flex flex-col gap-16 px-4');

  return (
    <main className='bg-[linear-gradient(180deg,#004505,#000)] pt-4'>
      <BreadcrumbsSection product={product} />
      <div className={mainWrapperClassName}>
        <MainSection product={product} />
        <DescriptionSection product={product} />
        <div className='flex flex-col max-w-2xl lg:flex-row lg:max-w-7xl w-full m-auto gap-16 lg:gap-6 lg:items-start'>
          <RatingSummary product={product} />
          <CustomerReviewSection />
        </div>
        <div>
          <ProductCarousel
            heading={`More from ${product.brand}`}
            productCardVariant='standard'
            products={brandProducts}
            position='productpage'
            bgColor=''
          />
        </div>
        <div>
          <ProductCarousel
            heading={`Similar Products`}
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
