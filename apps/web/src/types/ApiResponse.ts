import { StrapiImage } from './ImageData';

export module Article {
  export interface Attributes {
    title: string;
    content: string;
    created_at: string;
    updated_at: string;
    published_at: string;
    description: string;
    slug: string;
    image: StrapiImage.Data;
    banner: StrapiImage.Data | null;
  }

  export interface Data {
    id: number;
    attributes: Attributes;
  }

  export interface Response {
    data: Data[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }
}
