import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const shopReducer = createReducer(initialState, {
  LoadShopRequest: (state) => {
    state.isLoading = true;
  },
  LoadShopSuccess: (state, action) => {
    state.isShop = true;
    state.isLoading = false;
    state.shop = action.payload;
  },
  LoadShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isShop = false;
  },

  // get all shops ---admin
  getAllShopsRequest: (state) => {
    state.isLoading = true;
  },
  getAllShopsSuccess: (state, action) => {
    state.isLoading = false;
    state.shop = action.payload;
  },
  getAllSellerFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
