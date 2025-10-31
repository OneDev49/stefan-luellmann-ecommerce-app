'use client';

import { useState } from 'react';
import { TabOrder } from '../config/tabConfig';

import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import ChevronUpIcon from '@/components/icons/ui/ChevronUpIcon';
import ChevronDownIcon from '@/components/icons/ui/ChevronDownIcon';
import MapPinIcon from '@/components/icons/ecommerce/MapPinIcon';
import CartIcon from '@/components/icons/ecommerce/CartIcon';
import Link from 'next/link';

type filterOption = 'all' | 'delivered' | 'processing' | 'canceled';

interface DashboardOrderHistoryProps {
  orders: TabOrder[];
}

export default function DashboardOrderHistory({
  orders,
}: DashboardOrderHistoryProps) {
  const [filter, setFilter] = useState<filterOption>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filterOptions: filterOption[] = [
    'all',
    'delivered',
    'processing',
    'canceled',
  ];

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className='pt-12 pb-32'>
      {orders.length > 0 && filteredOrders ? (
        <>
          <div className='mb-4'>
            {filterOptions.map((f, index) => (
              <button
                key={index}
                type='button'
                onClick={() => setFilter(f as filterOption)}
                className={clsx(
                  'px-3 py-1 border-b-2',
                  filter === f ? 'border-green-400' : 'border-gray-600'
                )}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          {filteredOrders.length > 0 ? (
            <div className='overflow-x-auto w-full'>
              <table className='border-collapse min-w-[700px]'>
                <thead>
                  <tr className='border-b border-gray-600 text-left'>
                    <th className='p-2'>Order ID</th>
                    <th className='p-2'>Products</th>
                    <th className='p-2'>Delivery Date</th>
                    <th className='p-2'>Pricing</th>
                    <th className='p-2'>Status</th>
                    <th className='p-2'></th>
                  </tr>
                </thead>
                {filteredOrders.length > 0 &&
                  filteredOrders.map((order, index) => {
                    const totalProductCost: number = order.products.reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    );

                    const totalProductAmount: number = order.products.reduce(
                      (total, product) => total + product.quantity,
                      0
                    );
                    return (
                      <tbody key={index}>
                        <tr
                          className={clsx(
                            'hover:bg-green-800 cursor-pointer select-none',
                            expandedId === order.id && 'bg-green-900'
                          )}
                          onClick={() =>
                            setExpandedId(
                              expandedId === order.id ? null : order.id
                            )
                          }
                        >
                          <td className='p-2'>{order.id}</td>
                          <td className='p-2'>{totalProductAmount}</td>
                          <td className='p-2'>{order.deliveryDate}</td>
                          <td className='p-2'>
                            {totalProductCost.toFixed(2)}€
                          </td>
                          <td className='p-2'>
                            <div
                              className={clsx(
                                'rounded-3xl text-center border-2',
                                order.status === 'delivered' &&
                                  'border-green-400',
                                order.status === 'processing' &&
                                  'border-yellow-200',
                                order.status === 'canceled' && 'border-red-400'
                              )}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </div>
                          </td>
                          <td className='p-2'>
                            <button
                              type='button'
                              title={`Expand Order Number ${order.id}`}
                              aria-label={`Expand Order Number ${order.id}`}
                              className='w-4 h-4 bg-white rounded-full grid place-items-center'
                            >
                              {expandedId === order.id ? (
                                <ChevronUpIcon
                                  height={12}
                                  width={12}
                                  color='#000'
                                />
                              ) : (
                                <ChevronDownIcon
                                  height={12}
                                  width={12}
                                  color='#000'
                                />
                              )}
                            </button>
                          </td>
                        </tr>
                        {expandedId === order.id && (
                          <tr>
                            <td colSpan={6}>
                              <div
                                className={clsx(
                                  'space-y-2 p-2',
                                  expandedId === order.id &&
                                    'bg-green-950 border-l border-r border-b border-green-800 space-y-2'
                                )}
                              >
                                <p>
                                  This is Order{' '}
                                  <span className='underline'>{order.id}</span>.
                                  The following Details are available for this
                                  Order:
                                </p>
                                <hr className='border-gray-600' />
                                <div>
                                  <strong className='flex gap-1 items-center'>
                                    <MapPinIcon height={20} width={20} />
                                    Delivered to this Address:
                                  </strong>
                                  <table className='border-collapse ml-6'>
                                    <tbody>
                                      <tr>
                                        <td>Street:</td>
                                        <td>{order.address.street}</td>
                                      </tr>
                                      <tr>
                                        <td>ZIP:</td>
                                        <td>{order.address.zip}</td>
                                      </tr>
                                      <tr>
                                        <td>City:</td>
                                        <td>{order.address.city}</td>
                                      </tr>
                                      <tr>
                                        <td className='pr-4'>Country:</td>
                                        <td>{order.address.country}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <hr className='border-gray-600' />
                                <div>
                                  <strong className='flex gap-1 items-center'>
                                    <CartIcon height={20} width={20} />
                                    Following Products were ordered:
                                  </strong>
                                  <table className='border-collapse ml-6'>
                                    <tbody>
                                      <tr className='border-b-2 border-green-400'>
                                        <td>Product</td>
                                        <td className='px-5'>Qty</td>
                                        <td>Price</td>
                                      </tr>
                                      {order.products.map((product, index) => (
                                        <tr key={index}>
                                          <td>
                                            <Link
                                              className='underline'
                                              href={`/product/${product.id}`}
                                            >
                                              {product.name}
                                            </Link>
                                          </td>
                                          <td className='text-center'>
                                            {product.quantity}
                                          </td>
                                          <td>{product.price.toFixed(2)}€</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    );
                  })}
              </table>
            </div>
          ) : (
            <div className='px-3'>
              Your{' '}
              <span className='underline'>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </span>{' '}
              Tab is currently empty.
            </div>
          )}
        </>
      ) : (
        <div className='flex flex-col items-start gap-3'>
          <span>Your Order History is currently empty.</span>
          <Button
            variant='secondary'
            position='standalone'
            className='px-4 py-2 rounded-md'
            href='/search'
          >
            <ChevronLeftIcon height={20} />
            Browse our Store
          </Button>
        </div>
      )}
    </div>
  );
}
