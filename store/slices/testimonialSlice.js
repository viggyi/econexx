import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as url from "../../utils/Url";

export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url.BASE_URL}/api/site/testimonials`);

      const data = await res.json();

      if (!res.ok || !data.success) {
        return rejectWithValue(data.message || "Failed to fetch testimonials");
      }

      return data.data || [];
    } catch (error) {
      return rejectWithValue("Network error");
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    loading: false,
    error: null,
    data: null,
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch testimonials";
      });
  },
});

export default testimonialSlice.reducer;
