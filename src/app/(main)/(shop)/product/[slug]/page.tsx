import { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { mapToProductCard, mapToProductPage } from '@/lib/mappers/product';

import MainSection from './_components/MainSection';
import DescriptionSection from './_components/DescriptionSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import RatingSummary from './_components/RatingSummarySection';
import CustomerReviewSection from './_components/CustomerReviewSection';
import BreadcrumbsSection from './_components/BreadcrumbsSection';

const CAROUSEL_PRODUCT_LIMIT = 8;

// Deduplicate product queries between generateMetadata and page component
const getProduct = cache(async (slug: string) => {
  return prisma.product.findUnique({
    where: { slug },
  });
});

// Static generation for unchanging product page
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    select: { slug: true },
  });

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productDb = await getProduct(params.slug);

  if (!productDb) {
    return {
      title: 'Product Not Found',
      description: 'This Product does not exist.',
    };
  }

  const product = mapToProductPage(productDb);
  const imageUrl = `https://utfs.io/a/5sfnefg5kv/${product.imageUrl}`;

  return {
    title: `${product.name} - ${product.brand}`,
    description: product.shortDescription ?? 'High-Quality Products at Entro',
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.shortDescription ?? '',
      url: `/products/${product.slug}`,
      images: [
        {
          url: imageUrl,
          height: 280,
          width: 480,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} - ${product.brand}`,
      description: product.shortDescription ?? '',
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const productDb = await getProduct(params.slug);

  if (!productDb) notFound();

  const product = mapToProductPage(productDb);

  // Fetch related products for recommendations
  const [brandProductsDb, similarProductsDb] = await Promise.all([
    prisma.product.findMany({
      where: { brand: product.brand, id: { not: product.id } },
      take: CAROUSEL_PRODUCT_LIMIT,
    }),
    prisma.product.findMany({
      where: {
        productType: product.productType,
        brand: { not: product.brand },
      },
      take: CAROUSEL_PRODUCT_LIMIT,
    }),
  ]);

  const brandProducts = brandProductsDb.map(mapToProductCard);
  const similarProducts = similarProductsDb.map(mapToProductCard);

  return (
    <main className='bg-[linear-gradient(180deg,#004505,#000)] pt-4'>
      <BreadcrumbsSection product={product} />
      <div className='pt-8 pb-16 flex flex-col gap-16'>
        <MainSection product={product} />
        <DescriptionSection product={product} />
        <div className='flex flex-col max-w-2xl lg:flex-row lg:max-w-7xl w-full m-auto gap-16 lg:gap-6 lg:items-start'>
          <RatingSummary product={product} />
          <CustomerReviewSection />
        </div>
        <ProductCarousel
          heading={`More from ${product.brand}`}
          productCardVariant='standard'
          products={brandProducts}
          position='productpage'
        />
        <ProductCarousel
          heading={`Similar Products`}
          productCardVariant='standard'
          products={similarProducts}
          position='productpage'
        />
      </div>
    </main>
  );
}
