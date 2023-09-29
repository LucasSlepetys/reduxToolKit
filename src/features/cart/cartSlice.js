import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 5,
  total: 10,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  return fetch(URL)
    .then((resp) => resp.json())
    .catch((err) => console.log(err.message));
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount -= 1;
    },
    calculateTotal: (state) => {
      let totalAmount = 0;
      let totalPrice = 0;

      state.cartItems.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.price * item.amount;
      });

      state.amount = totalAmount;
      state.total = totalPrice.toFixed(2);
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotal } =
  cartSlice.actions;

export default cartSlice.reducer;
