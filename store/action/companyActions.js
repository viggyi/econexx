import { createAsyncThunk } from "@reduxjs/toolkit";
import * as url from "@/utils/Url";
import { request } from "@/services/Request";

// API Instance
const API = request(url.BASE_URL);
// ============================
// ✅ Fetch Company / Header Data
// ============================
export const fetchCompany = createAsyncThunk(
  "company/fetchCompany",
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.get("/api/header");      

      //✅ Optional: if your API sends { status: false }
      if (!data?.success) {
        return rejectWithValue({
          message: data?.message || "API returned status=false",
        });
      }
      if (!data) {
        return rejectWithValue({
          message: "No footer data received",
        });
      }

      return data;

    } catch (error) {
      return rejectWithValue({
        message: error?.message || "Something went wrong",
        data: error?.data || null,
      });
    }
  }
);
// ============================
// ✅ Fetch Footer Data
// ============================
export const fetchFooter = createAsyncThunk(
  "company/fetchFooter",
  async (_, { rejectWithValue }) => {
    try {
      const data = await API.get("/api/footer");
      if (!data.success) {
        return rejectWithValue({
          message: "No footer data received",
        });
      }

      return data.data;

    } catch (error) {
      return rejectWithValue({
        message: error?.message || "Failed to fetch footer",
        data: error?.data || null,
      });
    }
  }
);

// ============================
// ✅ Subscribe (Landing)
// ============================
export const subscribeLanding = createAsyncThunk(
  "company/subscribeLanding",
  async (email, { rejectWithValue }) => {
    try {
      const res = await API.post("/api/subscribe", {email,source: "landing",});
      
      if (res?.success) {
        return res;
      }
      return rejectWithValue({message: res?.message || "Subscription failed",});

    } catch (error) {
      const err = error?.data;     
      return rejectWithValue({
        message: err?.errors?.email?.[0] || message?.message || "Something went wrong",
      });
    }
  }
);