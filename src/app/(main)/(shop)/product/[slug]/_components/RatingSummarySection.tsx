'use client';

import { calculateAverageRating } from '@/lib/calculateRating';
import type { Product } from '@prisma/client';
import Rating from '@/components/ui/Rating';
import clsx from 'clsx';

interface RatingSummaryProps {
  product: Pick<
    Product,
    | 'oneStarReviews'
    | 'twoStarReviews'
    | 'threeStarReviews'
    | 'fourStarReviews'
    | 'fiveStarReviews'
  >;
}

export default function RatingSummary({ product }: RatingSummaryProps) {
  const { average, totalCount } = calculateAverageRating(product);

  const ratingDistribution = [
    { stars: 5, count: product.fiveStarReviews },
    { stars: 4, count: product.fourStarReviews },
    { stars: 3, count: product.threeStarReviews },
    { stars: 2, count: product.twoStarReviews },
    { stars: 1, count: product.oneStarReviews },
  ];

  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl p-8 flex flex-col gap-6'
  );

  return (
    <section className={transparentCardClassName}>
      <h2 className='text-4xl font-bold'>Rating</h2>
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-xl'>{totalCount} Total Customer Ratings</p>
        <div className='flex items-center gap-2'>
          <Rating rating={average} size='medium' />
          <span className='font-bold'>{average} out of 5</span>
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-2'>
        {ratingDistribution.map(({ stars, count }) => {
          const percentage = totalCount > 0 ? (count / totalCount) * 100 : 0;
          const starText = stars === 1 ? 'Star' : 'Stars';

          return (
            <div className='flex gap-4'>
              <span className='min-w-14'>
                {stars} {starText}
              </span>
              <div className='flex items-center gap-3'>
                <div className='min-w-48 bg-[#414141] h-4 relative overflow-hidden rounded-md'>
                  <div
                    className='absolute bg-[#1eff00] top-0 bottom-0'
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                ({percentage.toFixed(0)}%)
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
