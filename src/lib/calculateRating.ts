export interface CalculateRatingProps {
  oneStarReviews: number;
  twoStarReviews: number;
  threeStarReviews: number;
  fourStarReviews: number;
  fiveStarReviews: number;
}

export function calculateAverageRating(product: CalculateRatingProps) {
  const totalReviewCount =
    product.oneStarReviews +
    product.twoStarReviews +
    product.threeStarReviews +
    product.fourStarReviews +
    product.fiveStarReviews;

  // Return 0 if there are no reviews
  if (totalReviewCount === 0) {
    return {
      average: 0,
      totalCount: 0,
    };
  }

  const weightedTotal =
    product.oneStarReviews * 1 +
    product.twoStarReviews * 2 +
    product.threeStarReviews * 3 +
    product.fourStarReviews * 4 +
    product.fiveStarReviews * 5;

  const average = weightedTotal / totalReviewCount;

  // Return average and totalReviewCount rouded to one decimal point
  return {
    average: Math.round(average * 10) / 10,
    totalCount: totalReviewCount,
  };
}
