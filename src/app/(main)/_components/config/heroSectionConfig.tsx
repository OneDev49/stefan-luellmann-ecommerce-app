import { ReactNode } from 'react';

import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';
import SearchIcon from '@/components/icons/ui/SearchIcon';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export interface HeroSlide {
  heading: string;
  paragraph: ReactNode;
  image: {
    src: string;
    alt: string;
  };
  buttons: ReactNode;
}

const buttonClassName = `py-2 px-3 rounded-lg`;

export const heroSlides: HeroSlide[] = [
  {
    heading: 'High-Performance Components',
    paragraph: (
      <>
        New, Fast and Affordable Components here in our Entro Store.
        <br />
        Browse our collection of high-performance Components.
      </>
    ),
    image: {
      src: `${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/HdnlnX9Cx4ZfpnlJ3PehAocXYNJl1sLa6BqD0tKCE7b5PTh3`,
      alt: 'PC-Background',
    },
    buttons: (
      <>
        <Button
          as={Link}
          href='/search?category=components'
          className={buttonClassName}
          position='standalone'
          variant='primary'
        >
          <>
            <span>Explore our Catalouge</span>
            <AnglesRightIcon />
          </>
        </Button>
        <Button
          as={Link}
          href='/search'
          className={buttonClassName}
          position='standalone'
          variant='tertiary'
        >
          <>
            <span>Browse All Components</span>
            <SearchIcon />
          </>
        </Button>
      </>
    ),
  },
  {
    heading: 'GPUs of the Next Generation',
    paragraph: (
      <>
        We have all Next-Generation Graphic Cards, available here in our Entro
        Store.
        <br />
        Find the best GPU for the best Graphics.
      </>
    ),
    image: {
      src: `${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/HdnlnX9Cx4ZfNGobDd5PoZEjAaYiQV4nfc7zg5LWUFuDvqkX`,
      alt: 'Many different Graphic Card Brands',
    },
    buttons: (
      <>
        <Button
          as={Link}
          href='/search?category=gpu'
          position='standalone'
          className={buttonClassName}
        >
          <>
            <span>Discover all GPUs</span>
            <AnglesRightIcon />
          </>
        </Button>
        <Button
          as={Link}
          href='/search'
          variant='tertiary'
          position='standalone'
          className={buttonClassName}
        >
          <>
            <span>Browse All Components</span>
            <SearchIcon />
          </>
        </Button>
      </>
    ),
  },
  {
    heading: 'Build Your New Computer',
    paragraph: (
      <>
        Build your next Gaming Tower with our Premium Component selection.
        <br />
        Building your own Computer was never easier!
      </>
    ),
    image: {
      src: `${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/HdnlnX9Cx4ZfhaidLgIOzIZRH5v9FUaxABgXNueVni4QoDr0`,
      alt: 'Many different Graphic Card Brands',
    },
    buttons: (
      <>
        <Button
          as={Link}
          href='/search'
          className={buttonClassName}
          position='standalone'
          variant='primary'
        >
          <>
            <span>Discover our Components</span>
            <AnglesRightIcon />
          </>
        </Button>
      </>
    ),
  },
];
