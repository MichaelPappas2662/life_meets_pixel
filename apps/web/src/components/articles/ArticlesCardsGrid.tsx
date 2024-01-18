import Link from 'next/link';

import {
  Container,
  SimpleGrid,
} from '@mantine/core';

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
    <Link
      href={`/article/${article.attributes.slug}`}
      key={article.id}
      legacyBehavior
    >
      <ArticleCard height={height} article={article} />
    </Link>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}

export default ArticlesCardsGrid;
