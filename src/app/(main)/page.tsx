import { prisma } from '@/lib/prisma';
import HeroSection from './_components/HeroSection';
import ProductCarousel from '@/components/sections/ProductCarousel';

export default async function Home() {
  const onSaleProducts = await prisma.product.findMany({
    where: { isOnSale: true },
    take: 10,
  });

  const featuredGPUs = await prisma.product.findMany({
    where: { isFeatured: true, productType: 'GPU' },
    take: 10,
  });

  const newArrivals = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return (
    <main>
      <HeroSection />
      <ProductCarousel
        heading='Deals of the Week'
        productCardVariant='sale'
        products={onSaleProducts}
      />
      <ProductCarousel
        heading='Best Selling Graphics Cards'
        productCardVariant='standard'
        products={featuredGPUs}
      />
      <ProductCarousel
        heading='New Arrivals'
        productCardVariant='standard'
        products={newArrivals}
      />
    </main>
  );
}
