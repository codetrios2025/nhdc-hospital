import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

import serviceTestApi from "../../features/serviceTests/api/serviceTestApi";

/*
|--------------------------------------------------------------------------
| List
|--------------------------------------------------------------------------
*/

export const fetchServiceTests = createAsyncThunk(
  "serviceTests/fetchServiceTests",
  async (params = {}, thunkAPI) => {
    try {
      return await serviceTestApi.getServiceTests(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch service tests.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Details
|--------------------------------------------------------------------------
*/

export const fetchServiceTest = createAsyncThunk(
  "serviceTests/fetchServiceTest",
  async (id, thunkAPI) => {
    try {
      return await serviceTestApi.getServiceTest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to fetch service test.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Create
|--------------------------------------------------------------------------
*/

export const createServiceTest = createAsyncThunk(
  "serviceTests/createServiceTest",
  async (data, thunkAPI) => {
    try {
      const response = await serviceTestApi.createServiceTest(data);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to create service test.",
      });

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to create service test.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const updateServiceTest = createAsyncThunk(
  "serviceTests/updateServiceTest",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await serviceTestApi.updateServiceTest(id, data);

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: response.message,
        timer: 1500,
        showConfirmButton: false,
      });

      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to update service test.",
      });

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update service test.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export const deleteServiceTest = createAsyncThunk(
  "serviceTests/deleteServiceTest",
  async (id, thunkAPI) => {
    try {
      const result = await Swal.fire({
        title: "Delete Service Test?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
      });

      if (!result.isConfirmed) {
        return thunkAPI.rejectWithValue("Cancelled");
      }

      await serviceTestApi.deleteServiceTest(id);

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Service test deleted successfully.",
        timer: 1200,
        showConfirmButton: false,
      });

      return id;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Unable to delete service test.",
      });

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to delete service test.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

export const updateServiceTestStatus = createAsyncThunk(
  "serviceTests/updateServiceTestStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const response = await serviceTestApi.updateStatus(id, status);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update status.",
      );
    }
  },
);

/*
|--------------------------------------------------------------------------
| Display Order
|--------------------------------------------------------------------------
*/

export const updateServiceTestDisplayOrder = createAsyncThunk(
  "serviceTests/updateDisplayOrder",
  async ({ id, displayOrder }, thunkAPI) => {
    try {
      const response = await serviceTestApi.updateDisplayOrder(
        id,
        displayOrder,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to update display order.",
      );
    }
  },
);
