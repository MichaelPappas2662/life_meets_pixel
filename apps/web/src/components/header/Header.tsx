import Link from 'next/link';

import {
  Autocomplete,
  Burger,
  Group,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

import { useCategories } from '../../lib/context/CategoriesContext';
import classes from './Header.module.css';

const links = [
  { link: "/about", label: "Features" },
  { link: "/pricing", label: "Pricing" },
  { link: "/learn", label: "Learn" },
  { link: "/community", label: "Community" },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  const categoriesContext = useCategories();

  const safeCategories = categoriesContext ? categoriesContext.data : [];
  console.log("safeCategories", safeCategories);
  const items = safeCategories?.map((category: any) => (
    <Link
      key={category.attributes.name}
      href={`/category/${category.attributes.slug}`}
      passHref
      legacyBehavior
    >
      <a className={classes.link}>{category.attributes.name}</a>
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
          <p>Life meets pixel</p>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <Autocomplete
            className={classes.search}
            placeholder="Search"
            leftSection={
              <IconSearch
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            }
            data={[
              "React",
              "Angular",
              "Vue",
              "Next.js",
              "Riot.js",
              "Svelte",
              "Blitz.js",
            ]}
            visibleFrom="xs"
          />
        </Group>
      </div>
    </header>
  );
}
