import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';

import NextImage from '../../components/image';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import { Article } from '../../types/ApiResponse';

const ArticlePage = ({ article }: { article: Article.Data }) => {
  const imageUrl = getStrapiMedia(article.attributes.banner);
  return (
    <div>
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="uk-section">
        <div className="uk-container uk-container-small"></div>
        <h2>{article.attributes.description}</h2>
        <ReactMarkdown children={article.attributes.content} />
      </div>
      <hr className="uk-divider-small" />
      <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
        <NextImage image={article.attributes.image} />
        <div className="uk-width-expand">
          <p className="uk-margin-remove-bottom">By Michael</p>
          <p className="uk-text-meta uk-margin-remove-top">
            <Moment format="MMM Do YYYY">
              {article.attributes.published_at}
            </Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI("/articles", {
    fields: ["slug"],
  });

  return {
    paths: articlesRes.data.map((article: any) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const articlesRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  });
  // console.log(articlesRes.data[0]);

  return {
    props: { article: articlesRes.data[0] },
    revalidate: 1,
  };
}

export default ArticlePage;
