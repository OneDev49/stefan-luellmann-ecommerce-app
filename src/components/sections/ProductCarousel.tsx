'use client';

import { ProductCardType } from '@/types/product';

import ProductCard from '../ui/ProductCard';
import useEmblaCarousel from 'embla-carousel-react';

interface ProductCarouselProps {
  bgColor?: string;
  heading: string;
  products: ProductCardType[];
  productCardVariant?: 'standard' | 'compact';
}

export default function ProductCarousel({
  bgColor = 'linear-gradient(0deg, rgb(0 0 0 / 0%) 0%, rgb(0 93 28 / 50%) 31%, rgb(0 93 28 / 50%) 77%, rgb(0 0 0 / 0%) 100%',
  heading,
  products,
  productCardVariant = 'standard',
}: ProductCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: false, skipSnaps: true });

  return (
    <section className='flex flex-col gap-2' style={{ background: bgColor }}>
      <div className='px-4 sm:px-8 space-y-2'>
        <h2 className='text-3xl md:text-4xl capitalize font-bold'>{heading}</h2>
        <hr className='border-green-600' />
      </div>

      <div
        className='overflow-hidden px-4 sm:px-8 py-4 select-none'
        ref={emblaRef}
      >
        <div className='list-none p-0 m-0 flex gap-8'>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                variant={productCardVariant}
                product={product}
                buttonClassName='text-lg'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
