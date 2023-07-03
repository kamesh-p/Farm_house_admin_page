import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch the order data
export const getOrderData = createAsyncThunk("order/getOrderData", async () => {
  try {
    const response = await fetch(
      "https://add-to-card-a30ca-default-rtdb.firebaseio.com/FarmOrder.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch order data.");
    }
    const data = await response.json();
    const orders = Object.values(data);

    return orders;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

const initialState = {
  orderData: [],
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
      })
      .addCase(getOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export const {} = orderSlice.actions; // No additional actions defined

export default orderSlice.actions;
