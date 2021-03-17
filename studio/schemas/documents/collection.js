export default {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) =>
        Rule.required().warning("Shorter titles are usually better").max(50),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
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
      type: "contentImage",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          title: "Tag",
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
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
      name: "collectionArtists",
      title: "Artists",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    },
  ],
};
