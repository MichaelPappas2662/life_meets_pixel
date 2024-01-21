import {
  Hero,
  LeadGrid,
} from '../components';
import Seo from '../components/seo';
import { fetchAPI } from '../lib/api';
import styles from '../styles/Home.module.css';
import { Article } from '../types/ApiResponse';

interface HomeProps {
  articles: Article.Data[];
  categories: any;
  homepage: any;
  author: Article.Data["attributes"]["author"]["data"][];
}

const Home = ({ articles, homepage, author, categories }: HomeProps) => {
  return (
    <>
      <Seo seo={homepage?.attributes?.seo} />
      <div className={styles.container}>
        <Hero />
        <LeadGrid articles={articles} authors={author} />
      </div>
    </>
  );
};

interface HomepageResponse {
  data: {
    attributes: {
      seo: any;
      hero: any;
    };
  };
}

interface ArticleResponse {
  data: Article.Data[];
}

interface CategoryResponse {
  data: any;
}

interface AuthorResponse {
  data: Article.Data["attributes"]["author"]["data"][];
}

export async function getStaticProps() {
  try {
    const [articles, categories, author, homepage]: [
      ArticleResponse,
      CategoryResponse,
      AuthorResponse,
      HomepageResponse,
    ] = await Promise.all([
      fetchAPI("/articles", { populate: "*" }),
      fetchAPI("/categories", { populate: "*" }),
      fetchAPI("/writers", { populate: "*", encodeValuesOnly: true }),
      fetchAPI("/homepage", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        } as any,
      }),
    ]);
    console.log("categoriesProps", categories);
    return {
      props: {
        author: author.data,
        articles: articles.data,
        categories: categories.data,
        homepage: homepage.data,
      },
      revalidate: 1,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      props: {
        author: [],
        articles: [],
        categories: [],
        homepage: {},
      },
      revalidate: 1,
    };
  }
}

export default Home;
