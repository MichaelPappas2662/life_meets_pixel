interface Format {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiImage {
  image: {
    data: [
      {
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number | null;
          height: number | null;
          formats: {
            thumbnail: Format;
          };
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: any | null;
          createdAt: string;
          updatedAt: string;
        };
      },
    ];
  };
}
