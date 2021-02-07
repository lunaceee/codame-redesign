import gallery from "./gallery";
import blockContent from "./blockContent";

export default {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      validation: (Rule) =>
        Rule.max(50).warning("Shorter titles are usually better"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "article-image",
    },
    {
      name: "artworkShowcase",
      title: "Artwork showcase",
      type: "gallery",
    },
    {
      name: "editor",
      title: "Editor",
      type: "blockContent",
    },
    {
      name: "artists",
      title: "Artists",
      type: "array",
      validation: (Rule) =>
        Rule.unique().error("An artist can only appear once in this field"),
      validation: (Rule) => Rule.required(),
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
    },
  ],
};
