'use client';

import { brandSectionData } from './config/brandSectionConfig';

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
    },
    [
      AutoScroll({
        speed: 0.5,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ]
  );

  return (
    <section className='py-3 my-12'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex gap-4'>
          {[...brandSectionData, ...brandSectionData].map((brand, index) => (
            <div className='p-2' key={index}>
              <div className='relative mx-auto h-28 w-64 rounded-2xl overflow-hidden select-none'>
                <Link href={brand.href}>
                  <Image
                    height={600}
                    width={600}
                    src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${brand.src}`}
                    alt={brand.alt}
                    className='h-full w-full object-cover hover:scale-110 transition-all'
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
