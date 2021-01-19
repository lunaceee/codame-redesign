export default {
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          title: "Image",
          type: "image",
          lists: [],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "website",
      title: "Website",
      type: "string",
    },
    {
      name: "twitter",
      title: "Twitter",
      type: "string",
    },
    {
      name: "linkedin",
      title: "LinkedIn",
      type: "string",
    },
    {
      name: "facebook",
      title: "Facebook",
      type: "string",
    },
    {
      name: "instagram",
      title: "Instagram",
      type: "string",
    },
    {
      name: "pinterest",
      title: "Pinterest",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
