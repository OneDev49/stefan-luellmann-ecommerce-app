interface FakeReview {
  name: string;
  rating: number;
  reviewDate: string;
  title: string;
  review: string;
}

// Fake review data to imitate actual reviews for the product page
export const fakeReviews: FakeReview[] = [
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
