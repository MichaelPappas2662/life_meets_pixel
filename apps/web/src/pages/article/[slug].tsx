import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';

import {
  Container,
  Text,
} from '@mantine/core';

import Image2 from '../../components/image';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import { Article } from '../../types/ApiResponse';

const ArticlePage = ({
  article,
  author,
}: {
  article: Article.Data;
  author: any;
}) => {
  const imageUrl = getStrapiMedia(article.attributes.banner);
  const authorImage = getStrapiMedia(
    author.attributes.author.data.attributes.picture.data.attributes
  );
  console.log("Testing", authorImage);
  return (
    <Container size={"md"}>
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
        <Image2 image={article.attributes.image} />

        {authorImage && <Image2 image={authorImage} />}
        <div className="uk-width-expand">
          <Text fz="sm" inline>
            By {article.attributes.author.data.attributes.name}
          </Text>
          <Text fz="sm" inline>
            <Moment format="MMM Do YYYY">
              {article.attributes.published_at}
            </Moment>
          </Text>
        </div>
      </div>
    </Container>
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
    encodeValuesOnly: true,
  });

  const authorRes = await fetchAPI("/articles", {
    filters: {
      slug: params.slug,
    },
    populate: {
      author: {
        populate: "*",
      },
    },
    encodeValuesOnly: true,
  });
  console.log(
    "author",
    authorRes.data[0].attributes.author.data.attributes.picture.data.attributes
  );
  const categoriesRes = await fetchAPI("/categories");
  return {
    props: {
      article: articlesRes.data[0],
      author: authorRes.data[0],
      categories: categoriesRes,
    },
    revalidate: 1,
  };
}

export default ArticlePage;
