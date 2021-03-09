export default {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "projectArtists",
      title: "Featured artists",
      type: "array",
      of: [
        {
          title: "Artist",
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "contentImage",
      options: {
        hotspot: true,
      },
    },
    {
      name: "description",
      title: "Description",
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
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "projectDetails",
      title: "Project details",
      type: "blockContent",
    },
  ],
};
