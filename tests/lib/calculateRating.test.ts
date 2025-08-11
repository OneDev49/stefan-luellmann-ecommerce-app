import { calculateAverageRating } from '@/lib/calculateRating';
import type { CalculateRatingProps } from '@/lib/calculateRating';

describe('calculateAverageRating', () => {
  it('should calculate the correct average and total for a standard set of reviews', () => {
    const testProduct: CalculateRatingProps = {
      oneStarReviews: 1,
      twoStarReviews: 2,
      threeStarReviews: 3,
      fourStarReviews: 4,
      fiveStarReviews: 5,
    };

    const result = calculateAverageRating(testProduct);

    expect(result.totalCount).toBe(15);
    expect(result.average).toBe(3.7);
  });

  it('should return 0 for average and total when there are no reviews', () => {
    const testProduct: CalculateRatingProps = {
      oneStarReviews: 0,
      twoStarReviews: 0,
      threeStarReviews: 0,
      fourStarReviews: 0,
      fiveStarReviews: 0,
    };

    const result = calculateAverageRating(testProduct);

    expect(result.totalCount).toBe(0);
    expect(result.average).toBe(0);
  });

  it('should handle a perfect 5-star rating correctly', () => {
    const testProduct: CalculateRatingProps = {
      oneStarReviews: 0,
      twoStarReviews: 0,
      threeStarReviews: 0,
      fourStarReviews: 0,
      fiveStarReviews: 100,
    };

    const result = calculateAverageRating(testProduct);

    expect(result.totalCount).toBe(100);
    expect(result.average).toBe(5.0);
  });
});
