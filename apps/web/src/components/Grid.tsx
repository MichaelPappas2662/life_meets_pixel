import {
  Container,
  Grid,
  rem,
  SimpleGrid,
} from '@mantine/core';

import { Article } from '../types/ApiResponse';
import { ArticleCard } from './articles/ArticleCard';
import ArticlesCardsGrid from './articles/ArticlesCardsGrid';
import classes from './Grid.module.css';

const PRIMARY_COL_HEIGHT = rem(300);

export function LeadGrid({
  articles,
  authors,
}: {
  articles: Article.Data[];
  authors: Article.Data["attributes"]["author"]["data"][];
}) {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  const sortedArticles = [...articles].sort(
    (a, b) =>
      new Date(b.attributes.createdAt).getTime() -
      new Date(a.attributes.createdAt).getTime()
  );

  const lastTwoArticles = sortedArticles.slice(0, 2);
  const otherArticles = sortedArticles.slice(2);

  return (
    <Container size={"lg"} className={classes.wrapper}>
      <Grid gutter="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {lastTwoArticles.map((article, index) => {
            const articleAuthor = authors.find(
              (author) => author.id === article.attributes.author.data.id
            );
            return (
              <Grid.Col span={12} key={article.id}>
                <ArticleCard
                  height={
                    index === 0 ? PRIMARY_COL_HEIGHT : SECONDARY_COL_HEIGHT
                  }
                  article={article}
                  author={articleAuthor}
                />
              </Grid.Col>
            );
          })}

          <Grid.Col span={12}>
            <ArticlesCardsGrid
              articles={otherArticles}
              height={SECONDARY_COL_HEIGHT}
              authors={authors}
            />
          </Grid.Col>
        </SimpleGrid>
      </Grid>
    </Container>
  );
}
