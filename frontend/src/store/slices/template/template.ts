import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { getInfo } from "api/template";

export const fetchInfo = createAsyncThunk("template/fetchInfo", async () => {
  const response = await getInfo();

  return response.count;
});

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 2,
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchInfo.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});

export const { increment, decrement, incrementByAmount } =
  templateSlice.actions;

export default templateSlice.reducer;
