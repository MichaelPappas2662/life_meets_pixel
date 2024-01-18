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

export const GlobalContext = createContext({});

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Header />
      <Component {...pageProps} />;
      <Footer />
    </MantineProvider>
  );
}
