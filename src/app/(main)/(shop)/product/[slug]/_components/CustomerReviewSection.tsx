'use client';

import { useState, useEffect } from 'react';

import clsx from 'clsx';

import Rating from '@/components/ui/Rating';

interface Review {
  name: string;
  rating: number;
  reviewDate: string;
  title: string;
  review: string;
}

/* Fake Reviews for the Products */
const fakeReviews = [
  {
    name: 'Alex T.',
    rating: 5,
    reviewDate: '2025-07-15',
    title: 'Absolutely fantastic!',
    review:
      'This exceeded all my expectations. The performance is top-notch and it looks great in my build.',
  },
  {
    name: 'Julia M.',
    rating: 4,
    reviewDate: '2025-07-12',
    title: 'Solid performance, good value',
    review:
      'Works exactly as advertised. Good value for the price, though the installation was a bit tricky.',
  },
  {
    name: 'David R.',
    rating: 5,
    reviewDate: '2025-07-10',
    title: "Couldn't be happier",
    review:
      'An incredible piece of hardware. I was hesitant at first, but I am so glad I went with this.',
  },
  {
    name: 'Sophie L.',
    rating: 3,
    reviewDate: '2025-07-08',
    title: "It's okay.",
    review:
      'Does the job, but I feel like there are better options out there for the same price.',
  },
  {
    name: 'Markus K.',
    rating: 5,
    reviewDate: '2025-07-05',
    title: 'Top-tier product!',
    review:
      'Blown away by the quality. If you are on the fence, just get it. You will not regret it.',
  },
  {
    name: 'Lena H.',
    rating: 4,
    reviewDate: '2025-07-02',
    title: 'Very reliable',
    review:
      'I have been using this for a month now without any issues. Very stable and reliable component.',
  },
  {
    name: 'Tom B.',
    rating: 5,
    reviewDate: '2025-06-28',
    title: 'Silent and Powerful',
    review:
      'The best part is how quiet it runs, even under heavy load. A huge upgrade from my previous setup.',
  },
  {
    name: 'Chris P.',
    rating: 4,
    reviewDate: '2025-06-25',
    title: 'Great, but a bit pricey',
    review:
      'Excellent performance and build quality. I just wish it were a little more affordable.',
  },
  {
    name: 'Eva S.',
    rating: 5,
    reviewDate: '2025-06-22',
    title: 'Perfect!',
    review:
      'Exactly what I needed to complete my setup. The shipping was also incredibly fast.',
  },
  {
    name: 'John D.',
    rating: 4,
    reviewDate: '2025-06-19',
    title: 'A good all-rounder',
    review:
      'This component offers a great balance of performance and price for mid-range builds.',
  },
];

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

  useEffect(() => {
    const randomReviews = shuffleArray([...fakeReviews]).slice(
      0,
      Math.floor(Math.random() * 5) + 3
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
