import { configureStore } from '@reduxjs/toolkit';
import articleSlice from '../models/articles/articleSlice';

export default configureStore({
  reducer: {
    articles: articleSlice,
  },
});
