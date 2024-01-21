import Link from 'next/link';

import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Center,
  Group,
  rem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  IconBookmark,
  IconHeart,
  IconShare,
} from '@tabler/icons-react';

import { getStrapiMedia } from '../../lib/media';
import { Article } from '../../types/ApiResponse';
import NextImage from '../image';
import classes from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article.Data;
  height?: string;
  author?: Article.Data["attributes"]["author"]["data"];
}

export function ArticleCard({ height, article, author }: ArticleCardProps) {
  const theme = useMantineTheme();
  const title = article?.attributes?.title;
  const description = article?.attributes?.description;
  const authorName = article?.attributes?.author?.data?.attributes?.name ?? "";

  const authorAvatarPicture = getStrapiMedia(author?.attributes?.picture);
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link
          href={`/article/${article?.attributes?.slug}`}
          passHref
          legacyBehavior
        >
          <NextImage image={article?.attributes?.image} />
        </Link>
      </Card.Section>
      <Badge
        className={classes.rating}
        variant="gradient"
        gradient={{ from: "yellow", to: "red" }}
      >
        outstanding
      </Badge>

      <Text
        className={classes.title}
        fw={500}
        component="a"
        href={`/article/${article?.attributes?.slug}`}
      >
        {title}
      </Text>
      <Text fz="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar src={authorAvatarPicture} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {authorName}
          </Text>
        </Center>

        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action}>
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconBookmark
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[7]}
            />
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <IconShare
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.blue[6]}
            />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
