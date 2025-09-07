'use client';

import { ProductCardType } from '@/types/product';
import ProductCard from '../ui/ProductCard';
import useEmblaCarousel from 'embla-carousel-react';
import clsx from 'clsx';

interface ProductCarouselProps {
  bgColor?: string;
  heading: string;
  products: ProductCardType[];
  productCardVariant?: 'standard' | 'compact' | 'sideways';
  position?: 'mainpage' | 'productpage';
}

export default function ProductCarousel({
  bgColor = 'linear-gradient(0deg, rgb(0 0 0 / 0%) 0%, rgb(0 93 28 / 50%) 31%, rgb(0 93 28 / 50%) 77%, rgb(0 0 0 / 0%) 100%',
  heading,
  products,
  productCardVariant = 'standard',
  position = 'mainpage',
}: ProductCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: false, skipSnaps: true });

  if (position === 'mainpage') {
    return (
      <section
        className='my-32 flex flex-col gap-4'
        style={{ background: bgColor }}
      >
        <h2 className='text-4xl capitalize font-bold px-9'>{heading}</h2>
        <div className='overflow-hidden px-9 py-4 select-none' ref={emblaRef}>
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

  if (position === 'productpage') {
    const transparentCardClassName = clsx(
      'flex flex-col justify-between overflow-hidden'
    );

    return (
      <div className={transparentCardClassName}>
        <section className='flex flex-col' style={{ background: bgColor }}>
          <h2 className='p-2 px-8 text-4xl font-bold'>{heading}</h2>
          <div className='overflow-hidden px-8 py-5' ref={emblaRef}>
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
      </div>
    );
  }
}
