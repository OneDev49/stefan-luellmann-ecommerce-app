'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import SearchIcon from '@/components/icons/ui/SearchIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';
import clsx from 'clsx';

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
      const autoplayPlugin = emblaApi.plugins().autoplay as any;
      if (autoplayPlugin) autoplayPlugin.reset();
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

  const emblaContainerClassNames = clsx(
    'relative h-[85svh] w-full grid place-items-center flex-grow-0 flex-shrink-0'
  );

  const contentClassNames = clsx(
    'relative z-10 flex flex-col gap-6 items-center justify-center text-center p-3'
  );

  const imageContainerClassNames = clsx('absolute z-0 inset-0');

  const headingClassNames = clsx(
    'text-5xl col text-[#0DFF00] font-bold underline'
  );

  const imageClassNames = clsx(
    'w-full opacity-30 relative z-[-1] h-full object-cover'
  );

  return (
    <section className='w-full'>
      <h1 className='sr-only'>Entro: Your Computer and PC Component Shop</h1>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex select-none'>
          <div className={emblaContainerClassNames}>
            <div className={contentClassNames}>
              <h2 className={headingClassNames}>High-Performance Components</h2>
              <p className='text-lg'>
                New, Fast and Affordable Components here in our Entro Store.
                <br />
                Browse our collection of high-performance Components.
              </p>
              <div className='flex flex-col items-center gap-3'>
                <Button
                  href='/search?category=components'
                  className='p-[12px_18px] rounded-2xl'
                  position='section'
                >
                  <>
                    <span>Explore our Catalouge</span>
                    <AnglesRightIcon />
                  </>
                </Button>
                <Button href='/search' variant='tertiary' position='section'>
                  <>
                    <span>Browse All Components</span>
                    <SearchIcon />
                  </>
                </Button>
              </div>
            </div>
            <div className={imageContainerClassNames}>
              <div className='absolute inset-0 shadow-[inset_0_-20px_20px_20px_rgba(0,0,0,1)]'></div>
              <Image
                className={imageClassNames}
                src='https://utfs.io/a/5sfnefg5kv/HdnlnX9Cx4ZfpnlJ3PehAocXYNJl1sLa6BqD0tKCE7b5PTh3'
                alt='PC-Background'
                width={1400}
                height={800}
              />
            </div>
          </div>
          <div className={emblaContainerClassNames}>
            <div className={contentClassNames}>
              <h2 className={headingClassNames}>GPUs of the Next Generation</h2>
              <p className='text-lg'>
                We have all Next-Generation Graphic Cards, available here in our
                Entro Store.
                <br />
                Find the best GPU for the best Graphics.
              </p>
              <div className='flex flex-col items-center gap-3'>
                <Button
                  href='/search?category=gpu'
                  className='p-[12px_18px] rounded-2xl'
                  position='section'
                >
                  <>
                    <span>Discover all GPUs</span>
                    <AnglesRightIcon />
                  </>
                </Button>
                <Button href='/search' variant='tertiary' position='section'>
                  <>
                    <span>Browse All Components</span>
                    <SearchIcon />
                  </>
                </Button>
              </div>
            </div>
            <div className={imageContainerClassNames}>
              <div className='absolute inset-0 shadow-[inset_0_-20px_20px_20px_rgba(0,0,0,1)]'></div>
              <Image
                className={imageClassNames}
                src='https://utfs.io/a/5sfnefg5kv/HdnlnX9Cx4ZfNGobDd5PoZEjAaYiQV4nfc7zg5LWUFuDvqkX'
                alt='Many different Graphic Card Brands'
                width={1400}
                height={800}
              />
            </div>
          </div>
          <div className={emblaContainerClassNames}>
            <div className={contentClassNames}>
              <h2 className={headingClassNames}>Build Your New Computer</h2>
              <p className='text-lg'>
                Build your next Gaming Tower with our PC Builder with built in
                Component Check.
                <br />
                Building your own Computer was never easier!
              </p>
              <div className='flex flex-col items-center gap-3'>
                <Button
                  href='/pc-builder'
                  className='p-[12px_18px] rounded-2xl'
                  position='section'
                >
                  <>
                    <span>Discover all GPUs</span>
                    <AnglesRightIcon />
                  </>
                </Button>
                <Button href='/search' variant='tertiary' position='section'>
                  <>
                    <span>Browse All Components</span>
                    <SearchIcon />
                  </>
                </Button>
              </div>
            </div>
            <div className={imageContainerClassNames}>
              <div className='absolute inset-0 shadow-[inset_0_-20px_20px_20px_rgba(0,0,0,1)]'></div>
              <Image
                className={imageClassNames}
                src='https://utfs.io/a/5sfnefg5kv/HdnlnX9Cx4ZfhaidLgIOzIZRH5v9FUaxABgXNueVni4QoDr0'
                alt='Many different Graphic Card Brands'
                width={1400}
                height={800}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
