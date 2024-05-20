import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ipAdress } from '../../config';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`http://${ipAdress}:3000/api/product/`);
  return response.data.map(product => ({
    ...product,
    shopName: product.user?.FirstName + ' ' + product.user?.LastName,
    shopImage: product.user?.ImageUrl,
    shopAddress: product.user?.Address,
    shopTitle: product.user?.UserType === 'coffee' ? 'Coffee Shop' : 'Client',
}));
});

export const addProduct = createAsyncThunk('products/addProduct', async (productData) => {
  const response = await axios.post(`http://${ipAdress}:3000/api/product`, productData);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, productData }) => {
  const response = await axios.patch(`http://${ipAdress}:3000/api/product/${id}`, productData);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`http://${ipAdress}:3000/api/product/${id}`);
  return id;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    favorites: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { actions, reducer } = productSlice;
export default reducer;
