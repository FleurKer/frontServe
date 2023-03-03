import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { availableStartDate: null, availableEndDate: null, supplierId: null, name: null },
};

export const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    supplierTest: (state, action) => {
      state.value.availableStartDate = action.payload;
      state.value.availableEndDate = action.payload;
    },
    updateSupplierId: (state, action) => {
      state.value.supplierId = action.payload;
    },
    updateSupplierName: (state, action) => {
      state.value.name = action.payload;
    },
   
  },
});

export const { supplierTest, updateSupplierId, updateSupplierName } = supplierSlice.actions;
export default supplierSlice.reducer;
