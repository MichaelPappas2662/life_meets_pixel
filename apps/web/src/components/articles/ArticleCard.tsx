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

import { Article } from '../../types/ApiResponse';
import NextImage from '../image';
import classes from './ArticleCard.module.css';

interface ArticleCardProps {
  article: Article.Data;
  height?: string;
}

export function ArticleCard({ height, article }: ArticleCardProps) {
  const linkProps = {
    href: "https://mantine.dev",
    target: "_blank",
    rel: "noopener noreferrer",
  };
  const theme = useMantineTheme();
  const imageUrl = article.attributes.image;
  const title = article.attributes.title;
  const description = article.attributes.description;
  const authorName = article?.attributes?.author?.data?.attributes?.name ?? "";
  // console.log(authorName);
  const authorAvatarPicture =
    article?.attributes?.author?.data?.attributes?.picture ?? "";
  // console.log(authorAvatarPicture);
  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link
          href={`/article/${article.attributes.slug}`}
          passHref
          legacyBehavior
        >
          <a>
            <NextImage image={article.attributes.image} />
          </a>
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
        href={`/article/${article.attributes.slug}`}
      >
        {title}
      </Text>
      <Text fz="sm" c="dimmed" lineClamp={4}>
        {description}
      </Text>

      {/* <Text className={classes.title} fw={500} component="a" {...linkProps}>
        Resident Evil Village review
      </Text> */}
      {/* <Text fz="sm" c="dimmed" lineClamp={4}>
        Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but
        takes a very different direction to its predecessor, namely the fact
        that this time round instead of fighting against various mutated
        zombies, you’re now dealing with more occult enemies like werewolves and
        vampires.
      </Text> */}

      {/* Footer with author info and actions */}
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
