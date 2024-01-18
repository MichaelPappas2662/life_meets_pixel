import '@mantine/core/styles.css';
import '../styles/global.css';

import { createContext } from 'react';

import { AppProps } from 'next/app';

import {
  createTheme,
  MantineProvider,
} from '@mantine/core';

import {
  Footer,
  Header,
} from '../components';
import { SeoGlobalProps } from '../components/seo';
import { fetchAPI } from '../lib/api';

export const GlobalContext = createContext<SeoGlobalProps>({
  siteName: "",
  defaultSeo: {
    metaTitle: "",
    metaDescription: "",
    shareImage: "",
    article: false,
  },
});

const theme = createTheme({
  /** Put your mantine theme override here */
});

const App = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps;
  return (
    <GlobalContext.Provider value={global.attributes}>
      <MantineProvider theme={theme}>
        <Header />
        <Component {...pageProps} />;
        <Footer />
      </MantineProvider>
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
