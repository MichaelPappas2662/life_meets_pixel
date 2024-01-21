import NextImage from 'next/image';

import { getStrapiMedia } from '../lib/media';

const Image = ({ image }: any) => {
  const attributes = image?.data?.attributes;

  let alternativeText, width, height;

  if (attributes) {
    alternativeText = attributes.alternativeText;
    width = attributes.width;
    height = attributes.height;
  }

  const loader = () => {
    return getStrapiMedia(image);
  };

  return (
    <NextImage
      loader={loader}
      layout="responsive"
      width={width}
      height={height}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  );
};

export default Image;
