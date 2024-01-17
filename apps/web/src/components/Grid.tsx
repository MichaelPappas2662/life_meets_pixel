import {
  Container,
  Grid,
  rem,
  SimpleGrid,
  Skeleton,
} from '@mantine/core';

import { ArticleCard } from './articles/ArticleCard';
import ArticlesCardsGrid from './articles/ArticlesCardsGrid';
import classes from './Grid.module.css';

const PRIMARY_COL_HEIGHT = rem(300);

export function LeadGrid({ articles: articles }: any) {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container size={"lg"} className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Grid gutter="md">
          <Grid.Col>
            {" "}
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <ArticleCard />
          </Grid.Col>
          <Grid.Col span={6}>
            <ArticlesCardsGrid articles={articles} />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
