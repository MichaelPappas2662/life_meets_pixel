import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Life Meets Pixel</h1>
          {/* Navigation Links */}
        </header>

        <section className={styles.hero}>
          <h2>Welcome to Life Meets Pixel</h2>
          <p>Your daily dose of digital reviews and tech insights.</p>
          {/* Call to Action */}
        </section>

        {/* Rest of your sections */}

        <footer className={styles.footer}>
          © 2024 Life Meets Pixel. All rights reserved.
        </footer>
      </div>
    </Layout>
  );
}
