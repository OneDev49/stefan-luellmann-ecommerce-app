import { ComponentNames, ComponentSlugNames } from '@/types/components';

interface QuickNavCategory {
  name: ComponentNames;
  slug: ComponentSlugNames;
}

type SidebarNavMenu = {
  heading: string;
  categories: SidebarNavCategory[];
};

interface SidebarNavCategory {
  name: ComponentNames;
  slug: ComponentSlugNames;
  brands: string[];
}

/* Categories sorted by computer area */
const computerComponents: QuickNavCategory[] = [
  { name: 'CPU', slug: 'cpu' },
  { name: 'GPU', slug: 'gpu' },
  { name: 'RAM', slug: 'ram' },
  { name: 'Storage', slug: 'storage' },
  { name: 'Motherboard', slug: 'motherboard' },
  { name: 'Power Supply', slug: 'power' },
  { name: 'Sound Card', slug: 'soundcard' },
  { name: 'Cooling', slug: 'cooling' },
  { name: 'Case Fan', slug: 'casefan' },
  { name: 'Cases', slug: 'case' },
];

const computerExtras: QuickNavCategory[] = [
  { name: 'Mouse', slug: 'mouse' },
  { name: 'Keyboard', slug: 'keyboard' },
  { name: 'Headset', slug: 'headset' },
  { name: 'Microphone', slug: 'microphone' },
  { name: 'Webcam', slug: 'webcam' },
  { name: 'Monitor', slug: 'monitor' },
  { name: 'Optical Drive', slug: 'opticaldrive' },
  { name: 'Cable', slug: 'cable' },
];

const additionalDevices: QuickNavCategory[] = [
  { name: 'Laptop', slug: 'laptop' },
  { name: 'Printer', slug: 'printer' },
];

/* Categories of Bottom Header Navigation */
export const quickNavCategories: QuickNavCategory[] = [
  ...computerComponents,
  ...computerExtras,
  ...additionalDevices,
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
        name: 'Sound Card',
        slug: 'soundcard',
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
      {
        name: 'Cases',
        slug: 'case',
        brands: ['Example'],
      },
    ],
  },
  {
    heading: 'Computer Extras',
    categories: [
      {
        name: 'Mouse',
        slug: 'mouse',
        brands: ['Example'],
      },
      {
        name: 'Keyboard',
        slug: 'keyboard',
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
      {
        name: 'Monitor',
        slug: 'monitor',
        brands: ['Example'],
      },
      {
        name: 'Optical Drive',
        slug: 'opticaldrive',
        brands: ['Example'],
      },
      {
        name: 'Cable',
        slug: 'cable',
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
      {
        name: 'Printer',
        slug: 'printer',
        brands: ['Example'],
      },
    ],
  },
];
