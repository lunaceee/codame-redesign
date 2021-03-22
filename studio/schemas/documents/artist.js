export default {
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
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
      name: "description",
      title: "Description",
      description: "Limited to 300 characters",
      validation: (Rule) =>
        Rule.warning("Description can't exceed 300 characters").max(300),
      type: "text",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          title: "Tag",
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
    },
    {
      name: "profile",
      title: "Profile image",
      type: "contentImage",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "artistShowcase",
      title: "Artist showcase",
      type: "gallery",
    },
    {
      name: "artistDetails",
      title: "Artist details",
      validation: (Rule) => Rule.required(),
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
