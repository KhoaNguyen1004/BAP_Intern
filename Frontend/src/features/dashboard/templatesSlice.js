import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { http } from '../../services/http';
import TokenService from '../../services/token.service';

const initialState = {
  user: null,
  templates: [] || null,
  status: 'idle',
  error: null,
  chosen: null
};

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

export const addTemplate = createAsyncThunk(
  'templates/addTemplate',
  async (template, { rejectWithValue }) => {
    try {
      const response = await http.post('/AddTemplate', template);
      console.log('response.data:', response.data);
      console.log('response.data.template:', response.data.template);
      return {
        templates: response.data.templates,
        id: response.data.template.id
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to add template'
      );
    }
  }
);

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

export const deleteTemplate = createAsyncThunk(
  'templates/deleteTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.delete(`/DeleteTemplate/${id}`);
      console.log('response.data:', response.data);
      console.log('response.data.message:', response.data.message);
      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete template'
      );
    }
  }
);

export const chooseTemplate = createAsyncThunk(
  'templates/chooseTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.put(`/ChooseTemplate/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to choose template'
      );
    }
  }
);

export const getTemplate = createAsyncThunk(
  'templates/getTemplate',
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/GetTemplate/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get template'
      );
    }
  }
);

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
        state.templates = payload.templates;
        state.chosen = payload.chosen;
      })
      .addCase(getAllTemplates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to get templates';
      })
      .addCase(addTemplate.fulfilled, (state, { payload }) => {
        state.templates = payload.templates;
        state.chosen = payload.chosen;
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
      })
      .addCase(chooseTemplate.fulfilled, (state, { payload }) => {
        state.templates = payload.templates;
        state.chosen = payload.chosen;
      })
      .addCase(getTemplate.fulfilled, (state, { payload }) => {
        state.templates = payload.templates;
        state.chosen = payload.chosen;
      });
  }
});

export const { getUser } = templateSlice.actions;
export default templateSlice.reducer;
