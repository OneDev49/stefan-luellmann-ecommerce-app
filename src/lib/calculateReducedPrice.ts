export function calculateReducedPrice(
  originalPrice: number,
  reducedPrice: number
) {
  const discountPercent = ((reducedPrice / originalPrice - 1) * 100).toFixed(0);
  return {
    reducedPrice,
    discountPercent: Number(discountPercent),
  };
}
