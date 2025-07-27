interface Product {
  name: string;
}

export const addToCart = (product: Product) => {
  console.log(`Add to Cart clicked for: ${product.name}`);
};

export const addToWishlist = (product: Product) => {
  console.log(`Add to Wishlist clicked for: ${product.name}`);
};
