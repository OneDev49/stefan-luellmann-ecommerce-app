import {
  getFeaturedProducts,
  getNewArrivals,
  getOnSaleProducts,
} from '@/lib/data/products';
import { mapToProductCard } from '@/lib/mappers/product';

import HeroSection from './_components/HeroSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import BrandCarousel from './_components/BrandSection';

export default async function Home() {
  const [onSaleProductsDB, featuredGPUsDB, newArrivalsDB] = await Promise.all([
    getOnSaleProducts(10),
    getFeaturedProducts('GPU', 10),
    getNewArrivals(10),
  ]);

  const onSaleProducts = onSaleProductsDB.map(mapToProductCard);
  const featuredGPUs = featuredGPUsDB.map(mapToProductCard);
  const newArrivals = newArrivalsDB.map(mapToProductCard);

  return (
    <main>
      <HeroSection />
      <BrandCarousel />
      <div className='space-y-16'>
        <ProductCarousel
          heading='Deals of the Week'
          productCardVariant='standard'
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
      </div>
    </main>
  );
}
