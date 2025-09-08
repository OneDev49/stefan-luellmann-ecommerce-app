interface QuickNavCategory {
  name: string;
  slug: string;
}

type SidebarNavMenu = {
  heading: string;
  categories: SidebarNavCategory[];
};

interface SidebarNavCategory {
  name: string;
  slug: string;
  brands: string[];
}

/* Categories of Bottom Header Navigation */
export const quickNavCategories: QuickNavCategory[] = [
  { name: 'CPU', slug: 'cpu' },
  { name: 'Motherboard', slug: 'motherboard' },
  { name: 'RAM', slug: 'ram' },
  { name: 'Storage', slug: 'storage' },
  { name: 'GPU', slug: 'gpu' },
  { name: 'Power Supply', slug: 'power' },
  { name: 'Cases', slug: 'case' },
  { name: 'Cooling', slug: 'cooling' },
  { name: 'Monitor', slug: 'monitor' },
  { name: 'Keyboard', slug: 'keyboard' },
  { name: 'Mouse', slug: 'mouse' },
  { name: 'Headset', slug: 'headset' },
  { name: 'Case Fan', slug: 'casefan' },
  { name: 'Laptop', slug: 'laptop' },
  { name: 'Microphone', slug: 'microphone' },
  { name: 'Webcam', slug: 'webcam' },
];

/* Content of the LeftSidenav */
export const sideNavMenu: SidebarNavMenu[] = [
  {
    heading: 'Computer Components',
    categories: [
      {
        name: 'CPU',
        slug: 'cpu',
        brands: ['Axion', 'CoreForge', 'Helion', 'QuantumLeap', 'Zentheon'],
      },
      {
        name: 'GPU',
        slug: 'gpu',
        brands: [
          'AetherFlux',
          'ChronoShift',
          'Geode',
          'NoveCore',
          'Pixelis',
          'Singularity',
          'Vexel',
        ],
      },
      {
        name: 'RAM',
        slug: 'ram',
        brands: [
          'Aethelred',
          'Hypercore',
          'Momentum Storage',
          'Synapse Memory',
          'Veritas Digital',
        ],
      },
      {
        name: 'SSD',
        slug: 'ssd',
        brands: [
          'Hypercore',
          'Momentum Storage',
          'Quicksilicon',
          'Synapse Memory',
          'Veritas Digital',
        ],
      },
      {
        name: 'HDD',
        slug: 'hdd',
        brands: ['Momentum Storage', 'TerraVault', 'Veritas Digital'],
      },
      {
        name: 'Motherboard',
        slug: 'motherboard',
        brands: [
          'Aegis Prime',
          'Apex Boards',
          'Foundation Logic',
          'Tectonic Systems',
        ],
      },
      {
        name: 'Power Supply',
        slug: 'power',
        brands: ['Example'],
      },
      {
        name: 'Case',
        slug: 'case',
        brands: ['Example'],
      },
      {
        name: 'Cooling',
        slug: 'cooling',
        brands: ['Example'],
      },
      {
        name: 'Case Fan',
        slug: 'casefan',
        brands: ['Example'],
      },
    ],
  },
  {
    heading: 'Computer Extras',
    categories: [
      {
        name: 'Monitor',
        slug: 'monitor',
        brands: ['Example'],
      },
      {
        name: 'Keyboard',
        slug: 'keyboard',
        brands: ['Example'],
      },
      {
        name: 'Mouse',
        slug: 'mouse',
        brands: ['Example'],
      },
      {
        name: 'Headset',
        slug: 'headset',
        brands: ['Example'],
      },
      {
        name: 'Microphone',
        slug: 'microphone',
        brands: ['Example'],
      },
      {
        name: 'Webcam',
        slug: 'webcam',
        brands: ['Example'],
      },
    ],
  },
  {
    heading: 'Other Electronics',
    categories: [
      {
        name: 'Laptop',
        slug: 'laptop',
        brands: ['Example'],
      },
    ],
  },
];
