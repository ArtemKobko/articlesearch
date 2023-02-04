/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchArticles = createAsyncThunk(
  'article/fetchArticles',
  async () => {
    const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
    return response.data;
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload;
      state.isLoading = false;
    });
    // builder.addCase(fetchArticles.rejected, (state, action) => {
    //   state.articles = action.payload;
    // });
  },
});

export default articleSlice.reducer;
