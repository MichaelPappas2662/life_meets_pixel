import {
  Footer,
  Header,
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
        <Header />
        <Hero />
        <LeadGrid articles={articles} />
        <Footer />
      </div>
    </>
  );
};

export async function getStaticProps() {
  const [articlesRes] = await Promise.all([
    fetchAPI("/articles", { populate: "*" }),
  ]);
  return {
    props: {
      articles: articlesRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
