import { configureStore } from '@reduxjs/toolkit';
import articleSlice from '../models/articles/articleSlice';

const store = configureStore({
  reducer: {
    articles: articleSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
