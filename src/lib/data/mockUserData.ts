/**
 * @file Defines the fake user data for the demo mode.
 * @description Provides the fake user data for the complete demo mode when a user is logged into the demo account.
 * @see /lib/data/mockDashboardDB.ts - Consumes all objects (demoUserProfile, demoPaymentMethods, demoOrders) and puts
 * them into localStorage so that first-time visitors can experience the full store.
 */

import { TabOrder } from '@/app/dashboard/_components/config/tabConfig';
import { PaymentMethod, UserProfile } from '@prisma/client';

export const demoUserProfile: UserProfile = {
  id: 'demo-profile-456',
  userId: 'demo-user-123',
  firstName: 'Demo',
  lastName: 'User',
  phoneNumber: '1234567890',
  birthDate: new Date('1995-05-15'),
  gender: 'N/A',
  street: '123 Demo Street',
  zipCode: '90210',
  city: 'Demo City',
  country: 'Demoland',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const demoPaymentMethods: PaymentMethod[] = [
  {
    id: 'pm-demo-789',
    userId: 'demo-user-123',
    type: 'CREDIT_CARD',
    provider: 'MasterCard',
    cardHolderName: 'Demo User',
    last4: '1234',
    expiryMonth: 12,
    expiryYear: 2028,
    isDefault: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const demoOrders: TabOrder[] = [
  {
    id: '#100299',
    products: [
      {
        id: 'aetherflux-9000',
        name: 'AetherFlux 9000',
        quantity: 2,
        price: 1299,
      },
      {
        id: 'zentheon-x9-9950k',
        name: 'Zentheon X9 9950K',
        quantity: 1,
        price: 699,
      },
    ],
    deliveryDate: '2025-09-01',
    status: 'delivered',
    address: {
      street: 'Main Street 1',
      zip: '12345',
      city: 'Berlin',
      country: 'Germany',
    },
  },
  {
    id: '#100321',
    products: [
      {
        id: 'aegis-prime-ion-zt990i',
        name: 'Aegis Prime Ion ZT990I',
        quantity: 1,
        price: 549,
      },
    ],
    deliveryDate: '2025-09-05',
    status: 'processing',
    address: {
      street: 'Second Street 2',
      zip: '54321',
      city: 'Munich',
      country: 'Germany',
    },
  },
];
