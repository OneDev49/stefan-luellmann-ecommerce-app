'use client';

import { useState, useEffect } from 'react';
import { fakeReviews } from './config/fakeReviewConfig';

import clsx from 'clsx';
import Rating from '@/components/ui/Rating';

interface Review {
  name: string;
  rating: number;
  reviewDate: string;
  title: string;
  review: string;
}

const REVIEW_LOWER_LIMIT = 3;

/* Shuffle the Fake Review Array to make it more realistic */
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function CustomerReviewSection() {
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([]);

  // Randomize the amount of reviews being displayed on the frontend
  useEffect(() => {
    const randomReviews = shuffleArray([...fakeReviews]).slice(
      0,
      Math.floor(Math.random() * 5) + REVIEW_LOWER_LIMIT
    );
    setSelectedReviews(randomReviews);
  }, []);

  const transparentCardClassName = clsx(
    {
      ['pl-8 py-8']: selectedReviews.length > 4,
      ['p-8']: selectedReviews.length <= 4,
    },
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl flex-1'
  );

  const listClassNames = clsx(
    {
      ['pr-8 overflow-y-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-green-500']:
        selectedReviews.length > 4,
    },
    'list-none p-0 m-0 flex flex-col gap-8 max-h-[600px]'
  );

  return (
    <section className={`${transparentCardClassName} `}>
      <h2 className='text-4xl font-bold mb-4'>Customer Reviews</h2>
      <ul className={listClassNames}>
        {selectedReviews.map((review, index) => (
          <li key={index} className='border-b border-gray-700 pb-4'>
            <div className='flex items-center mb-2'>
              <Rating rating={review.rating} size='small' />
              <p className='ml-4 font-bold text-lg'>{review.title}</p>
            </div>
            <p className='text-gray-300 mb-2'>{review.review}</p>
            <p className='text-sm text-gray-500'>
              By {review.name} on{' '}
              {new Date(review.reviewDate).toLocaleDateString()}
            </p>
          </li>
        ))}
        {selectedReviews.length === 0 && (
          <p>Be the first to review this product!</p>
        )}
      </ul>
    </section>
  );
}

/*

{
    name: ``,
    rating: 0,
    reviewDate: ``,
    title: ``,
    review: ``,
  },
*/
