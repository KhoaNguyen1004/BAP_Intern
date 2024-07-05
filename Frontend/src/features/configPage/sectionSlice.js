import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../services/http';
import TokenService from '../../services/token.service';

const initialState = {
  user: null,

  section: [] || null,
  status: 'idle',
  error: null
};

export const addSection = createAsyncThunk(
  'section/addSection',
  async (section, { rejectWithValue }) => {
    try {
      const response = await http.post('/AddSection', section);
      console.log('response.data:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add section'
      );
    }
  }
);

export const editSection = createAsyncThunk(
  'section/editSection',
  async ({ id, section }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/EditSection/${id}`, section);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to edit section'
      );
    }
  }
);

export const deleteSection = createAsyncThunk(
  'section/deleteSection',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.delete(`/DeleteSection/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete section'
      );
    }
  }
);

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    getSection: (state, action) => {
      state.section = action.payload;
    },
    getUser(state) {
      state.user = TokenService.getUser();
    }
  },

  extraReducers: builder => {
    builder
      .addCase(addSection.pending, state => {
        state.status = 'loading';
      })
      .addCase(addSection.fulfilled, (state, action) => {
        state.section = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addSection.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(editSection.pending, state => {
        state.status = 'loading';
      })
      .addCase(editSection.fulfilled, (state, action) => {
        state.section = action.payload;
        state.status = 'succeeded';
      })
      .addCase(editSection.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(deleteSection.pending, state => {
        state.status = 'loading';
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.section = action.payload;
        state.status = 'succeeded';
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  }
});

export const { getSection } = sectionSlice.actions;
export default sectionSlice.reducer;
