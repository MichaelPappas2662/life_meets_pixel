import Link from 'next/link';

import {
  Container,
  SimpleGrid,
} from '@mantine/core';

import { fetchAPI } from '../../lib/api';
import { Article } from '../../types/ApiResponse';
import { ArticleCard } from './ArticleCard';

interface ArticlesCardsGridProps {
  articles: Article.Data[];
  height: string;
}

export function ArticlesCardsGrid({
  articles,
  height,
}: ArticlesCardsGridProps) {
  const cards = articles.map((article: Article.Data) => (
    <Link href={`/article/${article.attributes.slug}`} key={article.id}>
      <ArticleCard height={height} />
    </Link>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", { fields: ["slug"] });

  return {
    paths: articlesRes.data.map((article: any) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export default ArticlesCardsGrid;
