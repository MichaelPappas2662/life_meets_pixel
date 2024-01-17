import NextImage from 'next/image';

import { getStrapiMedia } from '../lib/media';

const Image = ({ image }: any) => {
  const { alternativeText, width, height } = image?.data[0].attributes ?? {};
  console.log(image.data[0].attributes);
  const loader = () => {
    return getStrapiMedia(image);
  };

  return (
    <NextImage
      loader={loader}
      layout="responsive"
      width={width || "100%"}
      height={height || "100%"}
      objectFit="contain"
      src={getStrapiMedia(image)}
      alt={alternativeText || ""}
    />
  );
};

export default Image;
