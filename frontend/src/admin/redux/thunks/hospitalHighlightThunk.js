import { createAsyncThunk } from "@reduxjs/toolkit";
import hospitalHighlightApi from "../../features/hospitalHighlights/api/hospitalHighlightApi";

/**
 * Get All Hospital Highlights
 */
export const fetchHospitalHighlights = createAsyncThunk(
  "hospitalHighlights/fetchAll",
  async (params = {}, thunkAPI) => {
    try {
      const response = await hospitalHighlightApi.getAll(params);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Hospital Highlights.",
      );
    }
  },
);

/**
 * Get Hospital Highlight By ID
 */
export const fetchHospitalHighlightById = createAsyncThunk(
  "hospitalHighlights/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await hospitalHighlightApi.getById(id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch Hospital Highlight.",
      );
    }
  },
);

/**
 * Create Hospital Highlight
 */
export const createHospitalHighlight = createAsyncThunk(
  "hospitalHighlights/create",
  async (data, thunkAPI) => {
    try {
      return await hospitalHighlightApi.create(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to create Hospital Highlight.",
        },
      );
    }
  },
);

/**
 * Update Hospital Highlight
 */
export const updateHospitalHighlight = createAsyncThunk(
  "hospitalHighlights/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await hospitalHighlightApi.update(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to update Hospital Highlight.",
        },
      );
    }
  },
);

/**
 * Delete Hospital Highlight
 */
export const deleteHospitalHighlight = createAsyncThunk(
  "hospitalHighlights/delete",
  async (id, thunkAPI) => {
    try {
      await hospitalHighlightApi.delete(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete Hospital Highlight.",
      );
    }
  },
);

/**
 * Change Status
 */
export const changeHospitalHighlightStatus = createAsyncThunk(
  "hospitalHighlights/changeStatus",
  async ({ id, isActive }, thunkAPI) => {
    try {
      const response = await hospitalHighlightApi.changeStatus(id, isActive);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update Hospital Highlight status.",
      );
    }
  },
);
