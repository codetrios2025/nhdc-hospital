import { createAsyncThunk } from "@reduxjs/toolkit";
import departmentApi from "../../features/departments/api/departmentApi";

export const fetchDepartments = createAsyncThunk(
  "departments/fetchDepartments",
  async (params = {}, thunkAPI) => {
    try {
      const response = await departmentApi.getDepartments(params);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch departments.",
      );
    }
  },
);

export const fetchDepartment = createAsyncThunk(
  "departments/fetchDepartment",
  async (id, thunkAPI) => {
    try {
      const response = await departmentApi.getDepartment(id);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch department.",
      );
    }
  },
);

export const createDepartment = createAsyncThunk(
  "departments/createDepartment",
  async (data, thunkAPI) => {
    try {
      const response = await departmentApi.createDepartment(data);

      return response.data;
    } catch (error) {
      console.log("Department Create Error:", error);
      console.log("Response:", error.response);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.response?.data || error.message,
      );
    }
  },
);

export const updateDepartment = createAsyncThunk(
  "departments/updateDepartment",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await departmentApi.updateDepartment(id, data);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update department.",
      );
    }
  },
);

export const deleteDepartment = createAsyncThunk(
  "departments/deleteDepartment",
  async (id, thunkAPI) => {
    try {
      await departmentApi.deleteDepartment(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to delete department.",
      );
    }
  },
);

export const fetchDepartmentDropdown1 = createAsyncThunk(
  "departments/fetchDepartmentDropdown",
  async (_, thunkAPI) => {
    try {
      const response = await departmentApi.getDropdown();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch dropdown.",
      );
    }
  },
);

export const fetchDepartmentDropdown = createAsyncThunk(
  "departments/fetchDepartmentDropdown",
  async (_, thunkAPI) => {
    try {
      const response = await departmentApi.getDropdown();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch dropdown.",
      );
    }
  },
);

export const fetchDepartmentStatistics = createAsyncThunk(
  "departments/fetchDepartmentStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await departmentApi.getStatistics();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch statistics.",
      );
    }
  },
);
