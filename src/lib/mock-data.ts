import { Product } from '@prisma/client';

export const mockGPUs: Product[] = [
  {
    id: 'gpu1',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'AetherFlux 9000',
    slug: 'aetherflux-9000',
    shortDescription:
      'The AetherFlux 9000 is an enthusiast-grade graphics card engineered for maximum performance in 4K and 8K resolution gaming and complex computational tasks. It utilizes a quantum-entangled processing core for predictive frame rendering.',
    longDescription:
      'The AetherFlux 9000 represents the apex of consumer graphics technology. Its core architecture is built on a 3nm process, integrating 24,576 shader units and 192 dedicated ray-tracing accelerators for physically accurate lighting and reflections. The card is equipped with 32GB of GDDR7X memory on a 512-bit bus, providing an unprecedented memory bandwidth of 1.5 TB/s. A proprietary liquid-metal thermal interface and a triple-fan vapor chamber cooling system maintain optimal operating temperatures under extreme loads. Connectivity includes DisplayPort 2.1 and HDMI 2.1a, supporting the latest high-refresh-rate displays.',
    imageUrl: '/images/products/aetherflux_9000.webp',
    category: 'GPU',
    price: 1299.99,
    reducedPrice: 1099.99,
    isOnSale: true,
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
    shortDescription:
      'The NovaCore N102C is a high-performance GPU designed for content creators and professionals. It offers a balance of raw gaming power and accelerated performance in creative applications.',
    longDescription:
      'The NovaCore N102C is built to accelerate professional workflows without compromising on gaming capability. It features 16,384 CUDA-equivalent cores and second-generation tensor cores specifically optimized for AI-driven tools in video editing, 3D modeling, and rendering suites. The card comes with 24GB of GDDR6 memory, which provides ample capacity for large datasets and complex 4K video timelines. Its dual-slot, blower-style cooler is designed for thermal efficiency in multi-GPU setups common in workstations. Studio-grade drivers ensure stability and performance in a wide range of certified professional applications.',
    imageUrl: '/images/products/novacore_n102c.webp',
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
    shortDescription:
      'The Pixelis Tritan AC1 is an efficient, entry-level graphics card ideal for 1080p gaming and general multimedia use. It delivers a consistent and stable experience in popular esports titles and less demanding AAA games.',
    longDescription:
      'The Pixelis Tritan AC1 provides a cost-effective entry point into PC gaming. Its architecture focuses on power efficiency, drawing a maximum of 150W via a single 8-pin power connector. The card is configured with 4,096 stream processors and 8GB of GDDR6 memory on a 128-bit bus, sufficient for high-setting 1080p gameplay. Its compact, dual-fan "Air-Cooled" (AC) design ensures compatibility with a wide range of small-form-factor and pre-built systems. The I/O consists of one HDMI 2.0 and three DisplayPort 1.4a outputs.',
    imageUrl: '/images/products/pixelis_tritan_ac1.webp',
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
    shortDescription:
      'The Vexel Vectr N is a mid-range GPU that offers a significant performance uplift for 1440p gaming. It provides access to modern features like real-time ray tracing and AI upscaling at a competitive price point.',
    longDescription:
      'The Vexel Vectr N targets the mainstream gaming segment with a powerful and feature-rich specification. It is equipped with 7,680 unified cores, a boost clock of 2.5 GHz, and 12GB of GDDR6X memory. This configuration enables high-refresh-rate gaming at 1440p resolution across a majority of modern titles. The card includes first-generation hardware for ray tracing and AI-enhanced supersampling, providing visual fidelity previously reserved for high-end cards. A standard dual-axial fan cooler with a copper heat pipe array effectively dissipates thermal load during extended use.',
    imageUrl: '/images/products/vexel_vectr_n.webp',
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
    shortDescription:
      'The Vexel Vectr N Ti is the enhanced version of the Vectr N, offering increased core counts and memory bandwidth for uncompromising 1440p and entry-level 4K gaming. It is engineered for users who demand higher frame rates and graphical settings.',
    longDescription:
      'The Vexel Vectr N Ti improves upon the base model with a 20% increase in core count, totaling 9,216 unified cores. It features a higher factory-overclocked boost speed of 2.7 GHz and is equipped with 16GB of faster GDDR6X memory on a wider 256-bit bus. These enhancements translate to a tangible performance gain, enabling max-setting 1440p gameplay and a viable 4K experience in many titles, especially when paired with AI upscaling. The Ti model utilizes an upgraded triple-fan cooling solution and a more robust power delivery system to sustain its higher performance targets.',
    imageUrl: '/images/products/vexel_vectr_n_ti.webp',
    category: 'GPU',
    price: 1399.99,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 5,
    isFeatured: true,
    rating: 4.1,
    reviewCount: 312,
  },
  {
    id: 'gpu6',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'AetherFlux 7500 XT',
    slug: 'aetherflux-7500-xt',
    shortDescription:
      "A high-end GPU designed for elite 1440p and introductory 4K gaming. It offers a subset of the flagship's architecture at a more accessible price point.",
    longDescription:
      'The AetherFlux 7500 XT is engineered from the same 3nm process as its 9000-series counterpart, featuring 18,432 shader units and 144 ray-tracing accelerators. It is equipped with 20GB of GDDR7 memory on a 320-bit bus, delivering over 900 GB/s of memory bandwidth for texture-heavy applications. The cooling system consists of a dual-fan vapor chamber assembly designed for high thermal efficiency in standard ATX cases. The 7500 XT is optimized for ultra-high refresh rates at 1440p and provides a consistent 60 FPS experience in most 4K titles.',
    imageUrl: '',
    category: 'GPU',
    price: 899,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 1000,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 99,
  },
  {
    id: 'gpu7',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'AetherFlux 8200',
    slug: 'aetherflux-8200',
    shortDescription:
      'A GPU positioned between the high-end and enthusiast tiers, targeting 4K gaming with high settings. It introduces second-generation quantum-entangled cores for improved predictive rendering.',
    longDescription:
      'The AetherFlux 8200 bridges the performance gap to the flagship model. It contains 20,480 shader units and 24GB of GDDR7X memory, identical in specification to the AetherFlux 9000 but with slightly lower clock speeds for improved manufacturing yields. The primary differentiator is the use of second-generation quantum cores, which refine the predictive rendering algorithms for lower latency in competitive scenarios. The card utilizes a robust 20-phase power delivery system and a triple-fan cooler with graphite thermal pads for sustained boost clock performance.',
    imageUrl: '',
    category: 'GPU',
    price: 1199,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 456,
    isFeatured: true,
    rating: 4.0,
    reviewCount: 658,
  },
  {
    id: 'gpu8',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'NovaCore N205W',
    slug: 'novacore-n205w',
    shortDescription:
      'An ultimate-tier workstation graphics card built for large-scale data science, real-time 8K video editing, and complex simulation workloads. It features expansive memory and certified drivers for mission-critical stability.',
    longDescription:
      'The NovaCore N205W is the definitive tool for creative and scientific professionals. It is equipped with 48GB of HBM3 memory with ECC support, ensuring data integrity during intensive computation. The core architecture comprises 20,480 specialized processing units optimized for double-precision floating-point math and matrix operations. A single-slot, high-pressure blower design efficiently expels heat, making it ideal for dense, multi-GPU server racks and workstations. The N205W is certified for over 100 professional applications, guaranteeing stability and optimized performance in industries from architectural visualization to medical imaging.',
    imageUrl: '',
    category: 'GPU',
    price: 3499,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 250,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 15,
  },
  {
    id: 'gpu9',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'NovaCore N50C',
    slug: 'novacore-n50c',
    shortDescription:
      'An entry-level professional graphics card for designers and editors working with 1080p and 2K media. It provides hardware acceleration for creative applications at a budget suitable for small businesses and freelancers.',
    longDescription:
      'The NovaCore N50C makes professional-grade hardware acceleration accessible. It features 8GB of GDDR6 ECC memory and 6,144 processing cores, providing a significant performance uplift over integrated graphics in tasks like photo editing, graphic design, and 1080p video encoding. The card is a low-profile, single-slot design that draws power directly from the PCIe slot, ensuring compatibility with small-form-factor and OEM workstations. Like all NovaCore products, it is supported by dedicated studio drivers for reliable performance in applications like Adobe Creative Suite and Autodesk AutoCAD.',
    imageUrl: '',
    category: 'GPU',
    price: 349,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 1000,
    isFeatured: true,
    rating: 4.1,
    reviewCount: 234,
  },
  {
    id: 'gpu10',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Pixelis Mono M1',
    slug: 'pixelis-mono-m1',
    shortDescription:
      'An ultra-budget, single-fan graphics card designed as a basic display adapter or for playing older and indie game titles. Its primary function is to enable multi-monitor setups on systems lacking integrated graphics.',
    longDescription:
      "The Pixelis Mono M1 is a minimalist GPU solution. It is built on a mature 12nm process and features 1,024 stream processors paired with 4GB of GDDR5 memory on a 64-bit bus. The card's power consumption is under 50W, requiring no external power connectors and making it a simple drop-in upgrade. Its single-fan cooler is quiet and effective for the low thermal output, and the half-height PCB allows for installation in slimline desktop cases. The I/O panel includes one HDMI 2.0 and one DVI-D port.",
    imageUrl: '',
    category: 'GPU',
    price: 89,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 750,
    isFeatured: true,
    rating: 3.7,
    reviewCount: 933,
  },
  {
    id: 'gpu11',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Pixelis Flow P2',
    slug: 'pixelis-flow-p2',
    shortDescription:
      'A completely silent, passively cooled graphics card for home theater PCs and quiet office workstations. It provides flawless 4K video playback and can handle light photo editing without any fan noise.',
    longDescription:
      "The Pixelis Flow P2 is engineered for absolute silence. It achieves this with a large, finned aluminum heatsink that dissipates the GPU's thermal load without the need for a fan. The core has 2,048 stream processors and 6GB of GDDR6 memory, sufficient for hardware-accelerated decoding of modern video codecs like AV1 and HEVC. This ensures smooth 4K HDR playback on connected displays. Its low power draw and silent operation make it the definitive choice for media consumption and productivity environments where noise is a primary concern.",
    imageUrl: '',
    category: 'GPU',
    price: 179,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 750,
    isFeatured: true,
    rating: 4.0,
    reviewCount: 241,
  },
  {
    id: 'gpu12',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Vexel Spark S1',
    slug: 'vexel-spark-s1',
    shortDescription:
      'A low-profile GPU that delivers competent 1080p gaming performance for small-form-factor (SFF) systems. It provides modern gaming features without compromising on case compatibility.',
    longDescription:
      'The Vexel Spark S1 packs significant power into a half-height form factor. It uses a highly binned GPU core with 5,120 shader units and is equipped with 8GB of GDDR6 memory. This combination is capable of running most AAA titles at 1080p with medium to high settings. To manage thermals within its compact design, it utilizes a custom dual-fan cooler with a dense copper heatsink. The card includes a swappable I/O bracket for both standard and low-profile cases, ensuring maximum compatibility for builders of compact gaming PCs.',
    imageUrl: '',
    category: 'GPU',
    price: 279,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 151,
    isFeatured: true,
    rating: 3.8,
    reviewCount: 155,
  },
  {
    id: 'gpu13',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Vexel Rift R5',
    slug: 'vexel-rift-r5',
    shortDescription:
      'A mainstream graphics card that excels at high-refresh-rate 1080p gaming. The Rift R5 is a direct competitor in the budget-conscious gaming market, focusing on raw performance over secondary features.',
    longDescription:
      'The Vexel Rift R5 is designed for the competitive 1080p gamer. The architecture prioritizes rasterization performance, featuring 6,400 unified cores with a high boost clock of 2.6 GHz. Paired with 8GB of fast GDDR6 memory, it consistently delivers over 144 FPS in popular esports titles. Ray-tracing hardware is included but is considered an entry-level implementation. The cooling solution is a standard dual-axial fan design with an aluminum fin stack, providing reliable thermal management at a low production cost.',
    imageUrl: '',
    category: 'GPU',
    price: 229,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 500,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 412,
  },
  {
    id: 'gpu14',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Vexel Vectr X',
    slug: 'vexel-vectr-x',
    shortDescription:
      'A high-end offering from Vexel that pushes into the 4K gaming domain. The Vectr X is built for enthusiasts seeking maximum performance from the Vexel architecture.',
    longDescription:
      "The Vexel Vectr X represents the peak of the Vectr series, designed to compete with other brands' premium models. It features a fully unlocked die with 10,752 unified cores and 16GB of GDDR6X memory on a 256-bit bus. This configuration provides the necessary throughput for a smooth 60+ FPS experience at 4K resolution with high graphical settings. The card features an enhanced second-generation AI upscaler for superior image quality and performance. A robust triple-fan cooler and a 16-phase power delivery system are standard to handle the card's 350W thermal design power.",
    imageUrl: '',
    category: 'GPU',
    price: 749,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 631,
    isFeatured: true,
    rating: 3.9,
    reviewCount: 99,
  },
  {
    id: 'gpu15',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'ChronoShift Temporal T1',
    slug: 'chronoshift-temporal-t1',
    shortDescription:
      'A mid-range GPU focused on delivering the lowest possible system latency. The Temporal T1 uses predictive hardware schedulers to reduce input-to-display lag in competitive games.',
    longDescription:
      'The ChronoShift Temporal T1 is built around the "Zero-Lag" architecture. While its 7,680 shader cores and 12GB of GDDR6 memory provide strong 1440p gaming performance, its key feature is the on-die Latency Reduction Unit (LRU). The LRU analyzes game telemetry and frame-render queues to predict and reorder GPU tasks, minimizing the time between user input and on-screen action. This provides a measurable competitive advantage in fast-paced shooters and racing games. The card is cooled by a sleek, wind-tunnel-tested dual-fan shroud.',
    imageUrl: '',
    category: 'GPU',
    price: 449,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 510,
    isFeatured: true,
    rating: 4.1,
    reviewCount: 411,
  },
  {
    id: 'gpu16',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'ChronoShift Temporal T2-X',
    slug: 'chronoshift-temporal-t2-x',
    shortDescription:
      'The enthusiast version of the Temporal series, combining high-end 4K performance with an advanced low-latency hardware suite. It is for competitive players who refuse to compromise on either frame rates or responsiveness.',
    longDescription:
      "The ChronoShift Temporal T2-X is a specialized tool for professional gaming. It boasts 10,240 shader cores and 16GB of ultra-low-latency GDDR6X memory. The core feature is the second-generation Latency Reduction Unit (LRU 2.0), which integrates directly with the system's USB bus to process mouse inputs ahead of the CPU, further reducing the input lag pipeline. This raw performance, combined with its latency-reducing hardware, enables an unparalleled level of responsiveness in 4K high-refresh-rate gaming. A hybrid air/liquid cooler is standard to maintain peak performance and low acoustics.",
    imageUrl: '',
    category: '',
    price: 849,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 311,
    isFeatured: true,
    rating: 4.4,
    reviewCount: 131,
  },
  {
    id: 'gpu17',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Geode G-100',
    slug: 'geode-g-100',
    shortDescription:
      'A basic, fanless graphics adapter designed purely for video output in servers or PCs with disabled integrated graphics. It is a low-power, low-cost utility component.',
    longDescription:
      'The Geode G-100 serves a singular purpose: to provide a video signal. With just 512 processing cores and 2GB of DDR4 memory, it is not intended for gaming or graphical acceleration. Its primary use case is in headless servers that require a GPU for initial setup or troubleshooting, or in office PCs where the CPU lacks an integrated GPU. The card is passively cooled, consumes less than 30W of power, and features a single HDMI 1.4 output. Its half-height, single-slot design ensures it can be installed in virtually any system.',
    imageUrl: '',
    category: 'GPU',
    price: 49,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 100,
    isFeatured: true,
    rating: 4.2,
    reviewCount: 10,
  },
  {
    id: 'gpu18',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Geode G-400X',
    slug: 'geode-g-400x',
    shortDescription:
      'A compact and efficient GPU designed for Mini-ITX builds. The G-400X offers respectable 1080p performance with a focus on low power consumption and thermal output.',
    longDescription:
      'The Geode G-400X is the premier choice for power-conscious ITX gamers. Built on an extremely efficient 5nm process, it delivers a performance level comparable to previous-generation mid-range cards while consuming a maximum of 120W. It is configured with 6,144 shader cores and 8GB of GDDR6 memory. The "X" signifies its compact, single-fan cooling solution, which uses a dense copper radiator and a high-static-pressure fan to effectively cool the components within a length of just 170mm. This makes it compatible with even the most restrictive Mini-ITX chassis.',
    imageUrl: '',
    category: 'GPU',
    price: 329,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 100,
    isFeatured: true,
    rating: 4.3,
    reviewCount: 85,
  },
  {
    id: 'gpu19',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Singularity Matrix-S',
    slug: 'singularity-matrix-s',
    shortDescription:
      'A specialized compute card designed for AI research and machine learning development, not for gaming. It features high-density tensor cores for accelerating neural network training.',
    longDescription:
      'The Singularity Matrix-S is a purpose-built accelerator for AI workloads. It eschews traditional graphics outputs and ray-tracing hardware in favor of 8,192 fourth-generation tensor cores optimized for FP16, bfloat16, and INT8 computations. The card includes 32GB of HBM3e memory, providing extreme bandwidth for training large language models and complex datasets. It connects via a PCIe 5.0 x16 interface and supports direct GPU-to-GPU communication over a high-speed bridge. Cooling is handled by a server-grade passive heatsink designed for high-airflow rack environments.',
    imageUrl: '',
    category: 'GPU',
    price: 2799,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 200,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 5,
  },
  {
    id: 'gpu20',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Pixelis Tritan AC2',
    slug: 'pixelis-tritan-ac2',
    shortDescription:
      'An upgraded version of the entry-level Tritan card, featuring more memory and a higher core count. It targets gamers looking for a solid 60 FPS experience in modern 1080p titles without a major investment.',
    longDescription: `The Pixelis Tritan AC2 enhances the successful AC1 formula. The stream processor count is increased to 5,120, and it is equipped with 8GB of faster GDDR6 memory on a 128-bit bus. These improvements allow the card to comfortably run demanding AAA games at 1080p resolution with high settings. The "Air-Cooled" dual-fan cooler is slightly larger than the AC1's, featuring an additional copper heat pipe for improved thermal dissipation to support the higher performance target. It remains an efficient card, drawing power from a single 8-pin connector.`,
    imageUrl: '',
    category: 'GPU',
    price: 199,
    reducedPrice: null,
    isOnSale: false,
    stockCount: 100,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 131,
  },
];

export const allMockProducts: Product[] = [...mockGPUs];

export async function findManyProducts(args: {
  where?: {
    category?: string;
    isOnSale?: boolean;
    isFeatured?: boolean;
    price?: { lt?: number };
  };
  take?: number;
  orderBy?: { createdAt?: 'desc' };
}): Promise<Product[]> {
  let products = [...allMockProducts];

  if (args.where?.category) {
    products = products.filter((p) => p.category === args.where?.category);
  }

  if (args.where?.isOnSale) {
    products = products.filter((p) => p.isOnSale === true);
  }

  if (args.where?.isFeatured) {
    products = products.filter((p) => p.isFeatured === true);
  }

  if (args.where?.price?.lt) {
    products = products.filter((p) => p.price < args.where!.price!.lt!);
  }

  if (args.orderBy?.createdAt === 'desc') {
    products = products.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  if (args.take) {
    return products.slice(0, args.take);
  }

  return products;
}

export async function findUniqueProduct(args: {
  where: { slug: string };
}): Promise<Product | null> {
  const product = allMockProducts.find((p) => p.slug === args.where.slug);
  return product || null;
}

/*

  {
    id: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    name: '',
    slug: '',
    shortDescription:
      ``,
    longDescription:
      ``,
    imageUrl: '',
    category: '',
    price: ,
    reducedPrice: null,
    isOnSale: false,
    stockCount: ,
    isFeatured: true,
    rating: ,
    reviewCount: ,
  },


*/
("This seems all incredibly inconvenient to change every single file just to use the mock-data. I still want to use Prisma, but I want to have multiple arrays in my mock-data, GPU array, CPU array, and they all get put into one array. And when I call a function I get the specific data I want, just like with Prisma. I don't want to change everything just to use mock data and completely replace Prisma.");
