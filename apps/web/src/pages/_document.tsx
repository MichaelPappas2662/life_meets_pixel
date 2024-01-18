import {
  Head,
  Main,
  NextScript,
} from 'next/document';

import { ColorSchemeScript } from '@mantine/core';

export default function Document() {
  return (
    <html lang="en">
      <Head />
      <ColorSchemeScript defaultColorScheme="auto" />
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  );
}
