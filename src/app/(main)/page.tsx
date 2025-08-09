import { prisma } from '@/lib/prisma';
import HeroSection from './_components/HeroSection';
import ProductCarousel from '@/components/sections/ProductCarousel';
import BrandCarousel from './_components/BrandSection';

export default async function Home() {
  const [onSaleProducts, featuredGPUs, newArrivals] = await Promise.all([
    prisma.product.findMany({
      where: { isOnSale: true },
      take: 10,
    }),
    prisma.product.findMany({
      where: { isFeatured: true, productType: 'GPU' },
      take: 10,
    }),
    prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),
  ]);

  const brandData = [
    {
      src: 'HdnlnX9Cx4ZfVXf7BBTXalGvFiE9W3xbHfKh8MpBuyqn6T1C',
      alt: 'Pixelis Brand Icon',
      href: '/search?brand=Pixelis',
    },
    {
      src: 'HdnlnX9Cx4ZfvZPKXI2YPOKuzIfQ5WHJ0UtC1xeBpbMdD9i3',
      alt: 'NovaCore Brand Icon',
      href: '/search?brand=NovaCore',
    },
    {
      src: 'HdnlnX9Cx4Zf57QvGmb96GNl42mzbQsxLdqTZv7HptMaEokr',
      alt: 'Synapse Memory Brand Icon',
      href: '/search?brand=Synapse+Memory',
    },
    {
      src: 'HdnlnX9Cx4ZfzWc7kyL8ihV5aPNf09FUncpXmy3RsWSKHYEt',
      alt: 'Apex Boards Brand Icon',
      href: '/search?brand=Apex+Boards',
    },
    {
      src: 'HdnlnX9Cx4ZfcElAaaeh4iMwoHC1QdPSe7yknFg3sqbNX2Em',
      alt: 'AetherFlux Brand Icon',
      href: '/search?brand=AetherFlux',
    },
    {
      src: 'HdnlnX9Cx4ZfhAiWmuIOzIZRH5v9FUaxABgXNueVni4QoDr0',
      alt: 'Veritas Digital',
      href: '/search?brand=Veritas+Digital',
    },
    {
      src: 'HdnlnX9Cx4ZfGmThWwvVd5P6IFZruLXTpYKfiw8bgUzC0Qae',
      alt: 'CoreForge Brand Icon',
      href: '/search?brand=CoreForge',
    },
    {
      src: 'HdnlnX9Cx4ZfZlAoZkx7jLd5sqi0f1blJzpugOUV9IWnXGeZ',
      alt: 'Vexel Brand Icon',
      href: '/search?brand=Vexel',
    },
    {
      src: 'HdnlnX9Cx4ZfKlveWxz8jEzkGiYeJTts5VoSc31OpLXUdNfR',
      alt: 'Foundation Logic Brand Icon',
      href: '/search?brand=Foundation+Logic',
    },
    {
      src: 'HdnlnX9Cx4Zfaaf35DZxnLotzESQ2y5AmUp34e1XGNvVbTjR',
      alt: 'Axion Brand Icon',
      href: '/search?brand=Axion',
    },
    {
      src: 'HdnlnX9Cx4Zfn7J144fBomEhfsy6vGaXtHJCSbUxjVQd8NYA',
      alt: 'Tectonic Systems Brand Icon',
      href: '/search?brand=Tectonic+Systems',
    },
    {
      src: 'HdnlnX9Cx4Zftl4WQ0BSVejMQq2gTr0IYRlEzHvXC8On1cpL',
      alt: 'Momentum Storage Brand Icon',
      href: '/search?brand=Momentum+Storage',
    },
    {
      src: 'HdnlnX9Cx4ZfGtRKGsVd5P6IFZruLXTpYKfiw8bgUzC0Qae4',
      alt: 'QuantumLeap Brand Icon',
      href: '/search?brand=QuantumLeap',
    },
    {
      src: 'HdnlnX9Cx4Zf2aYo3lFt9DHTVqylovM0L5phWekSu2BwmsaE',
      alt: 'Voltara Brand Icon',
      href: '/search?brand=Voltara',
    },
    {
      src: 'HdnlnX9Cx4ZfgFxER95aRiy0zlbfvUFoXStQsrkN1mKLP5xG',
      alt: 'Hypercore Brand Icon',
      href: '/search?brand=Hypercore',
    },
    {
      src: 'HdnlnX9Cx4ZfJgEhDTaxNksugRm8TpV1KELjUarMf5bXzhC6',
      alt: 'Zentheon Brand Icon',
      href: '/search?brand=Zentheon',
    },
  ];

  return (
    <main>
      <HeroSection />
      <BrandCarousel brands={brandData} />
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
    </main>
  );
}
