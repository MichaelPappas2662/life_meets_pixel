import { getStrapiURL } from './api';

export function getStrapiMedia(media: any) {
  if (!media || !media.data || !media.data[0]) {
    return null;
  }

  const { url } = media.data[0].attributes;
  const imageUrl = url?.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}

export function getAuthorPicture(author: any) {
  if (!author || !author.data || !author.data.attributes) {
    return null;
  }

  const { picture } = author.data.attributes;
  const authorImage = picture?.startsWith("/")
    ? getStrapiURL(picture)
    : picture;
  return authorImage;
}
