import {
  Container,
  Grid,
  rem,
  SimpleGrid,
} from '@mantine/core';

import { ArticleCard } from './articles/ArticleCard';
import ArticlesCardsGrid from './articles/ArticlesCardsGrid';
import classes from './Grid.module.css';

const PRIMARY_COL_HEIGHT = rem(300);

export function LeadGrid({ articles: articles }: any) {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container size={"lg"} className={classes.wrapper}>
      <Grid gutter="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <ArticleCard height={PRIMARY_COL_HEIGHT} />
          {/* Left Column */}
          <Grid.Col span={12}>
            <ArticleCard height={PRIMARY_COL_HEIGHT} />
            <ArticleCard height={PRIMARY_COL_HEIGHT} />
          </Grid.Col>

          {/* Right Column */}
          <Grid.Col span={12}>
            <ArticlesCardsGrid
              articles={articles}
              height={SECONDARY_COL_HEIGHT}
            />
          </Grid.Col>

          <Grid.Col span={12}>
            <ArticlesCardsGrid
              articles={articles}
              height={SECONDARY_COL_HEIGHT}
            />
          </Grid.Col>
        </SimpleGrid>
      </Grid>
    </Container>
  );
}
