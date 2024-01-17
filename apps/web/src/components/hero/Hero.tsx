import {
  Button,
  Container,
  Text,
  Title,
} from '@mantine/core';

import Particles from '../Particles';
import { Dots } from './Dots';
import classes from './Hero.module.css';

export function Hero() {
  return (
    <Container className={classes.wrapper} size={1900}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
      <Particles className={classes.particles} quantity={100} />{" "}
      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated AI{" "}
          <Text component="span" className={classes.highlight} inherit>
            code reviews
          </Text>{" "}
          for any stack
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            Build more reliable software with AI companion. AI is also trained
            to detect lazy developers who do nothing and just complain on
            Twitter.
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button
            className={classes.control}
            size="lg"
            variant="default"
            color="gray"
          >
            Book a demo
          </Button>
          <Button className={classes.control} size="lg" c={"grape"}>
            Purchase a license
          </Button>
        </div>
      </div>
    </Container>
  );
}
