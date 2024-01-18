import {
  Hero,
  LeadGrid,
} from '../components';
import Seo from '../components/seo';
import { fetchAPI } from '../lib/api';
import styles from '../styles/Home.module.css';

const Home = ({ articles, homepage }: any) => {
  return (
    <>
      <Seo seo={homepage?.attributes?.seo} />
      <div className={styles.container}>
        <Hero />
        <LeadGrid articles={articles} />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      } as any,
    }),
  ]);
  console.log(homepageRes.data);
  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
