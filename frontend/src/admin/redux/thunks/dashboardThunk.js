import { createAsyncThunk } from "@reduxjs/toolkit";

import dashboardService from "../../services/dashboard/dashboard.service";

export const fetchDashboardSummary = createAsyncThunk(
  "dashboard/fetchSummary",

  async (_, thunkAPI) => {
    try {
      const response = await dashboardService.getSummary();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
