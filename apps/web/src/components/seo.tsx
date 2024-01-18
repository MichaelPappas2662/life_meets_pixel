import { useContext } from 'react';

import Head from 'next/head';

import { getStrapiMedia } from '../lib/media';
import { GlobalContext } from '../pages/_app';

interface SeoProps {
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: string;
    article?: boolean;
  };
}

export interface SeoGlobalProps {
  defaultSeo: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: string;
    article?: boolean;
  };
  siteName: string;
}

const Seo = ({ seo }: SeoProps) => {
  const { defaultSeo, siteName } = useContext<SeoGlobalProps>(GlobalContext);
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };

  interface FullSeoSettings {
    metaTitle: string;
    metaDescription?: string;
    shareImage?: string;
    article?: boolean;
  }

  const fullSeo: FullSeoSettings = {
    ...seoWithDefaults,
    metaTitle: `${seoWithDefaults?.metaTitle} | ${siteName}`,
    shareImage: seo?.shareImage
      ? getStrapiMedia(seoWithDefaults.shareImage)
      : undefined,
  };

  return (
    <Head>
      <Head>
        {fullSeo.metaTitle && (
          <>
            <title>{fullSeo.metaTitle}</title>
            <meta property="og:title" content={fullSeo.metaTitle} />
            <meta name="twitter:title" content={fullSeo.metaTitle} />
          </>
        )}
        {fullSeo.metaDescription && (
          <>
            <meta name="description" content={fullSeo.metaDescription} />
            <meta property="og:description" content={fullSeo.metaDescription} />
            <meta
              name="twitter:description"
              content={fullSeo.metaDescription}
            />
          </>
        )}
        {fullSeo.shareImage && (
          <>
            <meta property="og:image" content={fullSeo.shareImage} />
            <meta name="twitter:image" content={fullSeo.shareImage} />
            <meta name="image" content={fullSeo.shareImage} />
          </>
        )}
        {fullSeo.article && <meta property="og:type" content="article" />}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </Head>
  );
};

export default Seo;
