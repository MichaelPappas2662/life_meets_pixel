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
  authors: Article.Data["attributes"]["author"]["data"][];
}

export function ArticlesCardsGrid({
  articles,
  height,
  authors,
}: ArticlesCardsGridProps) {
  const cards = articles.map((article) => {
    const articleAuthor = authors.find(
      (author) => author.id === article.attributes.author.data.id
    );

    return (
      <Link
        href={`/article/${article.attributes.slug}`}
        key={article.id}
        legacyBehavior
      >
        <ArticleCard height={height} article={article} author={articleAuthor} />
      </Link>
    );
  });

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}

export default ArticlesCardsGrid;
