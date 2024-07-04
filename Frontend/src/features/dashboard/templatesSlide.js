import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../services/http';
import TokenService from '../../services/token.service';

const initialState = {
  user: null,
  templates: [],
  status: 'idle',
  error: null
};

// Async thunk to fetch all templates
export const getAllTemplates = createAsyncThunk(
  'templates/getAllTemplates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get('/GetAllTemplate');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get templates'
      );
    }
  }
);

// Async thunk to add a new template
export const addTemplate = createAsyncThunk(
  'templates/addTemplate',
  async (template, { rejectWithValue }) => {
    try {
      const response = await http.post('/AddTemplate', template);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add template'
      );
    }
  }
);

// Async thunk to edit an existing template
export const editTemplate = createAsyncThunk(
  'templates/editTemplate',
  async ({ id, template }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/EditTemplate/${id}`, template);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to edit template'
      );
    }
  }
);

// Async thunk to delete a template
export const deleteTemplate = createAsyncThunk(
  'templates/deleteTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.delete(`/DeleteTemplate/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete template'
      );
    }
  }
);

// Slice for managing templates state
const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    getUser(state) {
      state.user = TokenService.getUser();
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getAllTemplates.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllTemplates.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.templates = payload;
      })
      .addCase(getAllTemplates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to get templates';
      })
      .addCase(addTemplate.fulfilled, (state, { payload }) => {
        state.templates.push(payload);
      })
      .addCase(editTemplate.fulfilled, (state, { payload }) => {
        const index = state.templates.findIndex(
          template => template.id === payload.id
        );
        if (index !== -1) {
          state.templates[index] = payload;
        }
      })
      .addCase(deleteTemplate.fulfilled, (state, { payload }) => {
        state.templates = state.templates.filter(
          template => template.id !== payload.id
        );
      });
  }
});

// Export actions and reducer
export const { getUser } = templateSlice.actions;
export default templateSlice.reducer;
