import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const getProducts = () => {
    dispatch(fetchProducts());
  };

  return {
    products,
    getProducts,
    status,
    error,
  };
};
