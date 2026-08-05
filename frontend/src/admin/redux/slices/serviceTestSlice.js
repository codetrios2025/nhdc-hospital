import { createSlice } from "@reduxjs/toolkit";

import {
  fetchServiceTests,
  fetchServiceTest,
  createServiceTest,
  updateServiceTest,
  deleteServiceTest,
  updateServiceTestStatus,
} from "../thunks/serviceTestThunk";

const initialState = {
  tests: [],
  test: null,

  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },

  filters: {
    keyword: "",
    service: "",
    status: "",
  },

  loading: false,
  submitting: false,
  error: null,
};

const serviceTestSlice = createSlice({
  name: "serviceTests",

  initialState,

  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    clearServiceTest(state) {
      state.test = null;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder;

    /*
    |--------------------------------------------------------------------------
    | Listing
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchServiceTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchServiceTests.fulfilled, (state, action) => {
        state.loading = false;

        state.tests = action.payload.data || [];

        state.pagination = {
          page: action.payload.page || 1,
          limit: action.payload.limit || 10,
          total: action.payload.total || 0,
          totalPages: action.payload.totalPages || 0,
        };
      })

      .addCase(fetchServiceTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /*
    |--------------------------------------------------------------------------
    | Details
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(fetchServiceTest.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchServiceTest.fulfilled, (state, action) => {
        state.loading = false;
        state.test = action.payload;
      })

      .addCase(fetchServiceTest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(createServiceTest.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })

      .addCase(createServiceTest.fulfilled, (state) => {
        state.submitting = false;
      })

      .addCase(createServiceTest.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    builder
      .addCase(updateServiceTest.pending, (state) => {
        state.submitting = true;
        state.error = null;
      })

      .addCase(updateServiceTest.fulfilled, (state, action) => {
        state.submitting = false;
        state.test = action.payload;
      })

      .addCase(updateServiceTest.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.payload;
      });

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    builder.addCase(deleteServiceTest.fulfilled, (state, action) => {
      state.tests = state.tests.filter((item) => item._id !== action.payload);
    });

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    builder.addCase(updateServiceTestStatus.fulfilled, (state, action) => {
      const index = state.tests.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (index !== -1) {
        state.tests[index].status = action.payload.status;
      }
    });
  },
});

export const { setFilters, clearServiceTest, clearError } =
  serviceTestSlice.actions;

export default serviceTestSlice.reducer;
