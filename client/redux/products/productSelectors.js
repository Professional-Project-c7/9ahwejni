export const selectAllProducts = (state) => state.products.items;
export const selectProductById = (state, productId) =>
  state.products.items.find(product => product.id === productId);
