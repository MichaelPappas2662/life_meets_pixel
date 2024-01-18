import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { NotFoundImage } from '../components/not_found/NotFoundImage';

export default function NotFound() {
  return (
    <MantineProvider>
      <NotFoundImage />
    </MantineProvider>
  );
}
