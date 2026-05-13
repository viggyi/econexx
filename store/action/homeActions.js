import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "@/services/Request";
import * as url from "@/utils/Url";


// ----------------------------
// Generic API Client
// ----------------------------
const API = request(url.BASE_URL);


// 1️⃣ Async action (API call)
export const fetchHomePageData = createAsyncThunk(
  "home/fetchHomePageData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/homepage/landing");

      // Backend responses in this codebase usually use `success`,
      // but this thunk was checking `status` which can cause rejection.
      const ok = res?.success ?? res?.status;
      // If backend doesn't return any success/status flag, but does return payload,
      // treat it as success.
      if (ok === undefined) {
        if (!res?.data && !res?.banner) {
          return rejectWithValue(res?.message || "Failed to fetch home page");
        }
      } else if (!ok) {
        return rejectWithValue(res?.message || "Failed to fetch home page");
      }

      // Prefer `res.data` when present; otherwise allow returning the payload directly.
      return res?.data ?? res;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

/* -------------------- 
API 2: BANNERS 
-------------------- */
export const fetchBanners = createAsyncThunk(
  "home/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/api/banners");

      const ok = res?.success ?? res?.status;
      if (ok === undefined) {
        if (!res?.data && !Array.isArray(res)) {
          return rejectWithValue(res?.message || "Failed to fetch banners");
        }
      } else if (!ok) {
        return rejectWithValue(res?.message || "Failed to fetch banners");
      }

      return res?.data ?? res; // array of banners
    } catch (error) {
      return rejectWithValue(error?.message || "Failed to fetch banners");
    }
  }
);

