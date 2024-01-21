import '@mantine/core/styles.css';
import '../styles/global.css';

import { createContext } from 'react';

import { AppProps } from 'next/app';

import {
  createTheme,
  MantineProvider,
} from '@mantine/core';

import RootLayout from '../components/common/layout';
import { SeoGlobalProps } from '../components/seo';
import { fetchAPI } from '../lib/api';
import CategoriesContext from '../lib/context/CategoriesContext';

export const GlobalContext = createContext<SeoGlobalProps>({
  siteName: "",
  defaultSeo: {
    metaTitle: "",
    metaDescription: "",
    shareImage: "",
    article: false,
  },
});

const theme = createTheme({});

const App = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps;
  const categories = pageProps.categories || [];

  console.log("categoriesApp", categories);

  return (
    <GlobalContext.Provider value={global.attributes}>
      <CategoriesContext.Provider value={categories}>
        <MantineProvider theme={theme}>
          <RootLayout>
            <Component {...pageProps} />;
          </RootLayout>
        </MantineProvider>
      </CategoriesContext.Provider>
    </GlobalContext.Provider>
  );
};

App.getInitialProps = async (appContext: any) => {
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    } as any,
  });

  return { pageProps: { ...pageProps, global: globalRes.data } };
};

export default App;
