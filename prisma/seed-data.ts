import { ProductType } from '@prisma/client';

export const categories = [
  { name: 'CPU', slug: 'cpu' },
  { name: 'GPU', slug: 'gpu' },
  { name: 'RAM', slug: 'ram' },
  { name: 'Components', slug: 'components' },
];

export const products = [
  {
    name: 'AetherFlux 9000',
    slug: 'aetherflux-9000',
    brand: 'AetherFlux',
    imageUrl: '/images/products/gpu/aetherflux_9000.webp',
    productType: ProductType.GPU,
    shortDescription:
      'The AetherFlux 9000 is an enthusiast-grade graphics card engineered for maximum performance in 4K and 8K resolution gaming and complex computational tasks. It utilizes a quantum-entangled processing core for predictive frame rendering.',
    longDescription:
      'The AetherFlux 9000 represents the apex of consumer graphics technology. Its core architecture is built on a 3nm process, integrating 24,576 shader units and 192 dedicated ray-tracing accelerators for physically accurate lighting and reflections. The card is equipped with 32GB of GDDR7X memory on a 512-bit bus, providing an unprecedented memory bandwidth of 1.5 TB/s. A proprietary liquid-metal thermal interface and a triple-fan vapor chamber cooling system maintain optimal operating temperatures under extreme loads. Connectivity includes DisplayPort 2.1 and HDMI 2.1a, supporting the latest high-refresh-rate displays.',
    isFeatured: true,
    price: 1299,
    stockCount: 100,
    isOnSale: true,
    reducedPrice: 1099.99,
    oneStarReviews: 0,
    twoStarReviews: 2,
    threeStarReviews: 5,
    fourStarReviews: 10,
    fiveStarReviews: 50,
    specs: {
      boostClock: '3000 MHz',
      memorySize: '32 GB',
      memoryType: 'GDDR7X',
      memoryBus: '512-bit',
      memoryBandwidth: '1536 GB/s',
      shaderUnits: '24,576',
      tdp: '450 W',
      powerConnectors: '1x 16-pin',
      outputs: '3x DisplayPort 2.1, 1x HDMI 2.1a',
      cardLength: '336 mm',
    },
    categorySlugs: ['gpu', 'components'],
  },
];
