import {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
  return (
    <Html>
      <Head />
      <ColorSchemeScript defaultColorScheme="auto" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
