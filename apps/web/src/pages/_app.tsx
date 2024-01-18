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

export const GlobalContext = createContext<SeoGlobalProps>({
  defaultSeo: {
    metaTitle: "Mantine Next Starter",
    metaDescription: "Next.js starter template for Mantine UI Framework",
    shareImage: "https://mantine.dev/social.png",
    article: false,
  },
  siteName: "Mantine Next Starter",
});

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  const { global } = pageProps;
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Component {...pageProps} />;
      <Footer />
    </MantineProvider>
  );
}
