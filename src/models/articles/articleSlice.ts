import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Article, ArticleState } from '../../types';

const initialState: ArticleState = {
  articles: [],
  isLoading: false,
};

export const fetchArticles = createAsyncThunk<Article[]>(
  'article/fetchArticles',
  async () => {
    const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
    return response.data as Article[];
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      const articleState = state;
      articleState.isLoading = true;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      const articleState = state;
      articleState.articles = action.payload;
      articleState.isLoading = false;
    });
    builder.addCase(fetchArticles.rejected, (state) => {
      const articleState = state;
      articleState.isLoading = true;
    });
  },
});

export default articleSlice.reducer;
