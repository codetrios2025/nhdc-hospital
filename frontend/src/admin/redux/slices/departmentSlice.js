import { createSlice } from "@reduxjs/toolkit";

import {
  fetchDepartments,
  fetchDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  fetchDepartmentDropdown,
  fetchDepartmentStatistics,
} from "../thunks/departmentThunk";

const initialState = {
  departments: [],
  department: null,
  dropdown: [],
  statistics: {},
  departmentDropdown: [],

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  filters: {
    search: "",
    status: "",
  },

  loading: false,
  submitting: false,
  error: null,
};

const departmentSlice = createSlice({
  name: "departments",

  initialState,

  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearDepartment(state) {
      state.department = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // List
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload.rows || [];
        state.pagination = action.payload.pagination || initialState.pagination;
      })

      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Details
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.department = action.payload;
      })

      // Dropdown
      .addCase(fetchDepartmentDropdown.fulfilled, (state, action) => {
        state.departmentDropdown = action.payload;
      })

      // Statistics
      .addCase(fetchDepartmentStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })

      // Create
      .addCase(createDepartment.pending, (state) => {
        state.submitting = true;
      })

      .addCase(createDepartment.fulfilled, (state) => {
        state.submitting = false;
      })

      .addCase(createDepartment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateDepartment.pending, (state) => {
        state.submitting = true;
      })

      .addCase(updateDepartment.fulfilled, (state) => {
        state.submitting = false;
      })

      .addCase(updateDepartment.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.departments = state.departments.filter(
          (item) => item._id !== action.payload,
        );
      });
  },
});

export const { setFilters, clearDepartment } = departmentSlice.actions;

export default departmentSlice.reducer;
