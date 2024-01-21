import {
  createContext,
  useContext,
} from 'react';

interface Category {
  id: number;
  attributes: {
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    articles: {};
  };
}

interface CategoriesContextData {
  data: Category[];
  meta: {};
}

const CategoriesContext = createContext<CategoriesContextData | null>(null);

export const useCategories = () => useContext(CategoriesContext);

export default CategoriesContext;
