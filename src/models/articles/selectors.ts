import { RootState } from '../../store';

export const selectArticles = (state: RootState) => state.articles.articles;
export const selectLoading = (state: RootState) => state.articles.isLoading;
