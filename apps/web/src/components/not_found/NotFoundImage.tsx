"use client";

import { useRouter } from 'next/navigation';

import {
  Button,
  Container,
  Image,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';

import image from './image.svg';
import classes from './NotFoundImage.module.css';

export function NotFoundImage() {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };
  return (
    <Container className={classes.root} size={"xl"}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src={image.src} className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={handleBackToHome}
          >
            Get back to home page
          </Button>
        </div>
      </SimpleGrid>
    </Container>
  );
}