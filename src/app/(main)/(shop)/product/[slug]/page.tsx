import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mapToProductCard, mapToProductPage } from '@/lib/mappers/product';
import {
  getAllProductSlugs,
  getBrandProducts,
  getProductBySlug,
  getSimilarProducts,
} from '@/lib/data/products';

import MainSection from './_components/MainSection';
import DescriptionSection from './_components/DescriptionSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import RatingSummary from './_components/RatingSummarySection';
import CustomerReviewSection from './_components/CustomerReviewSection';
import BreadcrumbsSection from './_components/BreadcrumbsSection';

// Static generation for unchanging product page
export const dynamic = 'force-static';
export const revalidate = false;

export async function generateStaticParams() {
  const products = await getAllProductSlugs();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const productDb = await getProductBySlug(params.slug);

  if (!productDb) {
    return {
      title: 'Product Not Found',
      description: 'This Product does not exist.',
    };
  }

  const product = mapToProductPage(productDb);
  const imageUrl = `${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`;

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
  const productDb = await getProductBySlug(params.slug);

  if (!productDb) notFound();

  const product = mapToProductPage(productDb);

  // Fetch related products for recommendations
  const [brandProductsDb, similarProductsDb] = await Promise.all([
    getBrandProducts(product.brand, product.id),
    getSimilarProducts(product.productType, product.brand, product.id),
  ]);

  const brandProducts = brandProductsDb.map(mapToProductCard);
  const similarProducts = similarProductsDb.map(mapToProductCard);

  return (
    <main className='bg-[linear-gradient(180deg,#004505,#000)] pt-4'>
      <div className='px-4'>
        <BreadcrumbsSection product={product} />
        <div className='pt-8 pb-8 md:pb-16 flex flex-col gap-8 md:gap-16'>
          <MainSection product={product} />
          <DescriptionSection product={product} />
          <div className='flex flex-col max-w-2xl lg:flex-row lg:max-w-7xl w-full m-auto gap-8 md:gap-16 lg:gap-6 lg:items-start'>
            <RatingSummary product={product} />
            <CustomerReviewSection />
          </div>
        </div>
      </div>
      <div className='pt-8 pb-16 flex flex-col gap-8 md:gap-16'>
        <ProductCarousel
          heading={`More from ${product.brand}`}
          productCardVariant='standard'
          products={brandProducts}
        />
        <ProductCarousel
          heading={`Similar Products`}
          productCardVariant='standard'
          products={similarProducts}
        />
      </div>
    </main>
  );
}
