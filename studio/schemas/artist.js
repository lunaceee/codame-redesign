import gallery from "./gallery";

export default {
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "profile",
      title: "Profile image",
      type: "article-image",
    },
    {
      name: "artistShowcase",
      title: "Artist showcase",
      type: "gallery",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
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
      name: "linkedIn",
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
    {
      name: "youtube",
      title: "YouTube",
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
