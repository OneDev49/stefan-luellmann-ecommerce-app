import type { Metadata } from 'next';

const siteUrl: string = 'https://ecommerce.stefan-luellmann.com/';

export const metadataConfig: Metadata = {
  title: {
    template: '%s | Entro - Computer Component Store',
    default: 'Entro - Computer Component Store | Everything for your Computer',
  },
  description:
    'Entro is the leading Computer Components Store on the Market. We offer you components of all variety, from GPU to GPU to whole computer setups.',

  // Author & Keywords Metadata
  authors: [{ name: 'Stefan Lüllmann', url: siteUrl }],
  creator: 'Stefan Lüllmann',
  keywords: [
    'Stefan Lüllmann',
    'E-Commerce Shop',
    'Next.js',
    'React',
    'Computer Components',
    'Components',
    'Demo',
    'Full-Stack Developer',
    'Full-Stack Project',
    'Germany',
  ],

  // Favicons & Icon Metadata
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },

  // Open Graph Metadata
  openGraph: {
    title: 'Entro - Computer Component Store | Everything for your Computer',
    description:
      'Entro - The leading Computer Component Store on the Market, offering a large variety of different Components and Computer Setups.',
    url: siteUrl,
    siteName: 'Entro',
    images: [
      {
        url: '',
        width: 1200,
        height: 600,
        alt: 'Entro - Computer Component Store',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // Twitter Card Metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Entro - Computer Component Store | Everything for your Computer',
    description:
      'Entro - The leading Computer Component Store on the Market, offering a large variety of different Components and Computer Setups.',
    images: [''],
  },

  // Other Metadata
  metadataBase: new URL(siteUrl),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
