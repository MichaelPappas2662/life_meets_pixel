import { ArticleCard } from '../../components/articles/ArticleCard';
import Seo from '../../components/seo';
import { fetchAPI } from '../../lib/api';

const Category = ({ category, categories }: any) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} articles`,
  };

  return (
    <>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.attributes.name}</h1>
          <ArticleCard article={category.attributes.articles.data} />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] });

  return {
    paths: categoriesRes.data.map((category: any) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      articles: {
        populate: "*",
      },
    },
  });
  const allCategories = await fetchAPI("/categories");

  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  };
}

export default Category;
