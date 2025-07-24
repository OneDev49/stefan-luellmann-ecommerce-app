import { Product } from '@prisma/client';

export const mockProducts: Product[] = [
  {
    id: 'gpu1',
    createdAt: new Date(),
    updatedAt: new Date(),

    name: 'AetherFlux 9000',
    slug: 'aetherflux-9000',
    description: 'A Powerful fake GPU Card.',
    imageUrl: '/images/products/aetherflux9000.webp',
    category: 'GPU',

    price: 1299.99,
    reducedPrice: null,

    isOnSale: false,
    stockCount: 100,
    isFeatured: true,

    rating: 4.5,
    reviewCount: 123,
  },
  {
    id: 'gpu2',
    createdAt: new Date(),
    updatedAt: new Date(),

    name: 'NovaCore N102C',
    slug: 'novecore-n102c',
    description: 'A modern, highly competetive fake GPU.',
    imageUrl: '/images/products/aetherflux9000.webp',
    category: 'GPU',

    price: 1599.99,
    reducedPrice: null,

    isOnSale: false,
    stockCount: 250,
    isFeatured: true,

    rating: 4.9,
    reviewCount: 231,
  },
  {
    id: 'gpu3',
    createdAt: new Date(),
    updatedAt: new Date(),

    name: 'Pixelis Tritan AC1',
    slug: 'pixelis-tritan-ac1',
    description: 'A modern, highly competetive fake GPU.',
    imageUrl: '/images/products/aetherflux9000.webp',
    category: 'GPU',

    price: 1159.99,
    reducedPrice: null,

    isOnSale: false,
    stockCount: 1000,
    isFeatured: true,

    rating: 4.2,
    reviewCount: 439,
  },
  {
    id: 'gpu4',
    createdAt: new Date(),
    updatedAt: new Date(),

    name: 'Vexel Vectr N',
    slug: 'vexel-vectr-n',
    description: 'A modern, highly competetive fake GPU.',
    imageUrl: '/images/products/aetherflux9000.webp',
    category: 'GPU',

    price: 999.99,
    reducedPrice: null,

    isOnSale: false,
    stockCount: 10,
    isFeatured: true,

    rating: 3.6,
    reviewCount: 156,
  },
  {
    id: 'gpu5',
    createdAt: new Date(),
    updatedAt: new Date(),

    name: 'Vexel Vectr N Ti',
    slug: 'vexel-vectr-n-ti',
    description: 'A modern, highly competetive fake GPU.',
    imageUrl: '/images/products/aetherflux9000.webp',
    category: 'GPU',

    price: 1399.99,
    reducedPrice: 888.88,

    isOnSale: false,
    stockCount: 5,
    isFeatured: true,

    rating: 4.1,
    reviewCount: 312,
  },
];

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = mockProducts.find((p) => p.slug === slug);
  return product || null;
}
