'use client';

import ChevronLeftIcon from '@/components/icons/ui/ChevronLeftIcon';
import Button from '@/components/ui/Button';
import clsx from 'clsx';
import { useState } from 'react';
import { TabOrder, TabUser } from '../config/tabConfig';

export default function DashboardOrderHistory({
  user,
  orders,
}: {
  user: TabUser;
  orders: TabOrder[];
}) {
  const [filter, setFilter] = useState<
    'all' | 'delivered' | 'to_process' | 'canceled'
  >('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className='py-12 max-w-5xl w-[95%]'>
      {filteredOrders ? (
        <div>
          <div className='flex gap-4 mb-4'>
            {['all', 'delivered', 'to_process', 'canceled'].map((f) => (
              <button
                key={f}
                type='button'
                onClick={() => setFilter(f as any)}
                className={clsx(
                  'px-3 py-1 rounded',
                  filter === f ? 'bg-green-700' : 'bg-gray-700'
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <table className='w-full border-collapse'>
            <thead>
              <tr className='bg-gray-800 text-left'>
                <th className='p-2'>Order ID</th>
                <th className='p-2'>Products</th>
                <th className='p-2'>Delivery Date</th>
                <th className='p-2'>Pricing</th>
                <th className='p-2'>Status</th>
                <th className='p-2'>Expand</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <>
                  <tr key={index} className='border-b border-gray-700'>
                    <td className='p-2'>{order.id}</td>
                    <td className='p-2'>{order.products.length}</td>
                    <td className='p-2'>{order.deliveryDate}</td>
                    <td className='p-2'>{order.totalPrice}</td>
                    <td className='p-2'>{order.status}</td>
                    <td className='p-2'>
                      <button
                        type='button'
                        onClick={() =>
                          setExpandedId(
                            expandedId === order.id ? null : order.id
                          )
                        }
                      >
                        {expandedId === order.id ? 'Hide' : 'Expand'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr>
                      <td colSpan={6} className='bg-gray-900 p-2'>
                        <div className='space-y-2'>
                          <div>
                            <strong>Address:</strong> {order.address.street},{' '}
                            {order.address.city}
                          </div>
                          <div>
                            <strong>Products:</strong>
                          </div>
                          <ul className='list-disc ml-6'>
                            {order.products.map((p, index) => (
                              <li key={index}>
                                {p.name} x{p.quantity} - {p.price}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='flex flex-col items-start gap-3'>
          <span>Your Order History is currently empty.</span>
          <Button variant='secondary' href='/search'>
            <ChevronLeftIcon height={20} />
            Browse our Store
          </Button>
        </div>
      )}
    </div>
  );
}
