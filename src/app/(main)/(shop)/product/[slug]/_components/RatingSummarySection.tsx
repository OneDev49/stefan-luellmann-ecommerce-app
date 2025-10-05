'use client';

import { ProductPageType } from '@/types/product';

import Rating from '@/components/ui/Rating';

interface RatingSummaryProps {
  product: Pick<
    ProductPageType,
    | 'averageRating'
    | 'totalRatingCount'
    | 'oneStarReviews'
    | 'twoStarReviews'
    | 'threeStarReviews'
    | 'fourStarReviews'
    | 'fiveStarReviews'
  >;
}

export default function RatingSummary({ product }: RatingSummaryProps) {
  /* Rating Distribution for different Rating Amounts */
  const ratingDistribution = [
    { stars: 5, count: product.fiveStarReviews },
    { stars: 4, count: product.fourStarReviews },
    { stars: 3, count: product.threeStarReviews },
    { stars: 2, count: product.twoStarReviews },
    { stars: 1, count: product.oneStarReviews },
  ];

  return (
    <section className='bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl p-8 flex flex-col gap-6'>
      <h2 className='text-4xl font-bold'>Product Rating</h2>
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-xl'>
          {product.totalRatingCount} Total Customer Ratings
        </p>
        <div className='flex items-center gap-2'>
          <Rating rating={product.averageRating} size='medium' />
          <span className='font-bold'>{product.averageRating} out of 5</span>
        </div>
      </div>

      <div className='flex flex-col gap-2 mt-2'>
        {ratingDistribution.map(({ stars, count }) => {
          const percentage =
            product.totalRatingCount > 0
              ? (count / product.totalRatingCount) * 100
              : 0;
          const starText = stars === 1 ? 'Star' : 'Stars';

          return (
            <div className='flex gap-4' key={stars}>
              <span className='min-w-14'>
                {stars} {starText}
              </span>
              <div className='flex w-full items-center gap-3'>
                <div className='w-full lg:w-auto lg:min-w-48 bg-[#414141] h-4 relative overflow-hidden rounded-md'>
                  <div
                    className='absolute bg-[#1eff00] top-0 bottom-0'
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className='min-w-12 lg:min-w-0'>
                  ({percentage.toFixed(0)}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
