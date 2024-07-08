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
      const response = await http.get('/allTemplate');
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
      const response = await http.post('/template', template);
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
      const response = await http.put(`/template/${id}`, template);
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
  async (template_ids, { rejectWithValue }) => {
    try {
      const response = await http.delete('template', {
        data: { template_ids }
      });
      console.log('response.data:', response.data);
      console.log('response.data.template_ids:', template_ids);
      return { template_ids, ...response.data };
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
      const response = await http.put(`/show/${id}`);
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
      const response = await http.get(`/template/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get template'
      );
    }
  }
);

export const cloneTemplate = createAsyncThunk(
  'templates/cloneTemplate',
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/template/${id}`, name);
      console.log('response.data:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to clone template'
      );
    }
  }
);
export const editHeader = createAsyncThunk(
  'section/editHeader',
  async ({ id, header }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/template/${id}/header`, header);
      console.log('response.data:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to edit header'
      );
    }
  }
);

export const editFooter = createAsyncThunk(
  'section/editFooter',
  async ({ id, footer }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/template/${id}/footer`, footer);
      console.log('response.data:', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to edit footer'
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
      .addCase(deleteTemplate.fulfilled, (state, action) => {
        const { template_ids } = action.payload;
        state.templates = state.templates.filter(
          template => !template_ids.includes(template.id)
        );
        state.status = 'succeeded';
      })
      .addCase(deleteTemplate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteTemplate.pending, state => {
        state.status = 'loading';
      })

      .addCase(chooseTemplate.fulfilled, (state, { payload }) => {
        state.templates = payload.templates;
        state.chosen = payload.chosen;
      })
      .addCase(getTemplate.fulfilled, (state, { payload }) => {
        state.templates = payload.templates;
        state.chosen = payload.chosen;
      })
      .addCase(cloneTemplate.pending, state => {
        state.status = 'loading';
      })
      .addCase(cloneTemplate.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.templates = payload.templates;
        state.chosen = payload.chosen;
      })
      .addCase(cloneTemplate.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to clone template';
      });
  }
});

export const { getUser } = templateSlice.actions;
export default templateSlice.reducer;
