import type { Schema, Attribute } from '@strapi/strapi';

export interface SectionsSections extends Schema.Component {
  collectionName: 'components_sections_sections';
  info: {
    displayName: 'Sections.hero';
    icon: 'folder';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SeoSeo extends Schema.Component {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'Shared.seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.String;
    shareImage: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'sections.sections': SectionsSections;
      'seo.seo': SeoSeo;
    }
  }
}
