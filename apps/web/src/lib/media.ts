import { getStrapiURL } from './api';

export function getStrapiMedia(media: any) {
  if (!media || !media.data || !media.data[0]) {
    return null;
  }

  const { url } = media.data[0].attributes;
  const imageUrl = url?.startsWith("/") ? getStrapiURL(url) : url;
  return imageUrl;
}
