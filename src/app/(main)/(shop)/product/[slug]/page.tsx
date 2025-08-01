import { prisma } from '@/lib/prisma';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import MainSection from './_components/MainSection';
import DescriptionSection from './_components/DescriptionSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import RatingSummary from './_components/RatingSummarySection';
import CustomerReviewSection from './_components/CustomerReviewSection';
import BreadcrumbsSection from './_components/BreadcrumbsSection';

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  const mainWrapperClassNames = clsx('pt-8 pb-16 flex flex-col gap-16');

  const brandProducts = await prisma.product.findMany({
    where: { brand: product.brand, id: { not: product.id } },
    take: 7,
  });

  const similarProducts = await prisma.product.findMany({
    where: { productType: product.productType, brand: { not: product.brand } },
    take: 7,
  });

  return (
    <main className='bg-[linear-gradient(180deg,#004505,#000)] pt-4'>
      <BreadcrumbsSection
        productName={product.name}
        category={product.productType}
      />
      <div className={mainWrapperClassNames}>
        <MainSection productItem={product} />
        <DescriptionSection productItem={product} />
        <div className='flex max-w-7xl w-[95%] m-auto gap-6 items-start'>
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
