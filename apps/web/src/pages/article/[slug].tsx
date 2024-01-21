import ReactMarkdown from 'react-markdown';
import Moment from 'react-moment';

import {
  Avatar,
  Container,
  Divider,
  Text,
} from '@mantine/core';

import StrapiImage from '../../components/image';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
import { Article } from '../../types/ApiResponse';

const ArticlePage = ({
  article,
  authors,
}: {
  article: Article.Data;
  authors: Article.Data["attributes"]["author"]["data"][];
}) => {
  const imageUrl = getStrapiMedia(article.attributes.banner);
  const specificAuthor = authors?.find(
    (author) => author.id === article.attributes.author.data.id
  );

  console.log("specificAuthor", specificAuthor);
  const authorImage = getStrapiMedia(specificAuthor?.attributes?.picture);
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

        <Avatar src={authorImage} />
        <div className="uk-width-expand">
          <Text fz="sm" inline>
            By {article.attributes.author.data.attributes.name}
          </Text>
          <Text fz="sm" inline>
            <Moment format="MMM Do YYYY">
              {article.attributes.publishedAt}
            </Moment>
          </Text>
          <Divider />
        </div>
        <br />
        <StrapiImage image={article.attributes.image} />
        <br />
        <ReactMarkdown children={article.attributes.content} />
        <br />
        <StrapiImage image={article.attributes.banner} />
      </div>

      <div className="uk-grid-small uk-flex-left" data-uk-grid="true"></div>
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

  const authorRes = await fetchAPI("/writers", {
    filters: {
      slug: articlesRes.data[0].attributes.author.data.attributes.slug,
    },
    populate: "*",
    encodeValuesOnly: true,
  });
  const categoriesRes = await fetchAPI("/categories");
  return {
    props: {
      article: articlesRes.data[0],
      authors: authorRes.data,
      categories: categoriesRes,
    },
    revalidate: 1,
  };
}

export default ArticlePage;
