import { StrapiImage } from './ImageData';

export module Article {
  export interface Attributes {
    title: string;
    content: string;
    author: {
      data: {
        attributes: {
          picture: string;
          name: string;
        };
      };
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    slug: string;
    image: StrapiImage;
    banner: StrapiImage;
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
