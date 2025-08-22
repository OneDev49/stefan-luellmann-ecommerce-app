export interface CalculateRatingProps {
  oneStarReviews: number;
  twoStarReviews: number;
  threeStarReviews: number;
  fourStarReviews: number;
  fiveStarReviews: number;
}

export function calculateAverageRating(
  variant: 'totalRatingCount' | 'averageRating',
  product: CalculateRatingProps
): number {
  if (product === undefined) return 0;

  const totalReviewCount =
    product.oneStarReviews +
    product.twoStarReviews +
    product.threeStarReviews +
    product.fourStarReviews +
    product.fiveStarReviews;

  // Return 0 if there are no reviews
  if (totalReviewCount === 0) return 0;

  const weightedTotal =
    product.oneStarReviews * 1 +
    product.twoStarReviews * 2 +
    product.threeStarReviews * 3 +
    product.fourStarReviews * 4 +
    product.fiveStarReviews * 5;

  if (variant === 'averageRating') {
    const average = weightedTotal / totalReviewCount;
    return Number(Math.round(average * 10) / 10);
  }

  return totalReviewCount;
}
