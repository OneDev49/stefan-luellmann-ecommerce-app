'use client';

import { useEffect } from 'react';
import { heroSlides } from './config/heroSectionConfig';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
      }),
    ]
  );

  /* Stop Autoplay when User is Interacting */
  useEffect(() => {
    if (!emblaApi) return;

    /* Callback */
    const resetAutoplay = () => {
      const autoplayPlugin = emblaApi.plugins().autoplay;

      if (!autoplayPlugin || !('reset' in autoplayPlugin)) {
        return;
      }

      autoplayPlugin.reset();
    };

    /* Listeners */
    emblaApi.on('pointerDown', resetAutoplay);
    emblaApi.on('select', resetAutoplay);

    /* Cleanup */
    return () => {
      emblaApi.off('pointerDown', resetAutoplay);
      emblaApi.off('select', resetAutoplay);
    };
  }, [emblaApi]);

  return (
    <section className='w-full shadow-[0_20px_20px_20px_rgb(0,0,0,1)]'>
      <h1 className='sr-only'>Entro: Your Computer and PC Component Shop</h1>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex select-none'>
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className='relative h-[80svh] w-full grid place-items-center flex-grow-0 flex-shrink-0'
            >
              <div className='relative z-10 flex flex-col gap-6 items-center justify-center text-center p-3 bg-[rgb(0,0,0,0.5)] w-full'>
                <h2
                  className='text-5xl col text-[#0DFF00] font-bold underline'
                  style={{ textShadow: '2px 1px 5px #0dff00' }}
                >
                  {slide.heading}
                </h2>
                <p className='text-lg'>{slide.paragraph}</p>
                <div className='flex flex-col items-center gap-3'>
                  {slide.buttons}
                </div>
              </div>
              <div className='absolute z-0 inset-0'>
                <div className='absolute inset-0 shadow-[inset_0_-20px_20px_20px_rgba(0,0,0,1)]'></div>
                <Image
                  className='w-full brightness-50 relative z-[-1] h-full object-cover'
                  src={slide.image.src}
                  alt={slide.image.alt}
                  width={1400}
                  height={800}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
