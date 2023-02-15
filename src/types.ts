interface Lunches {
  id: string;
  provider: string;
}
export interface Article {
  id: number;
  title: string;
  url: string;
  imageUrl: string;
  newsSite: string;
  summary: string;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  launches: Lunches[];
  events: Array<string>;
}

export interface ArticleState {
  articles: Article[];
  isLoading: boolean;
}
