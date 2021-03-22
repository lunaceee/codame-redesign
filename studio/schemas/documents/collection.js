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
        Rule.required().warning("Shorter titles are usually better").max(80),
    },
    {
      name: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
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
      validation: (Rule) => Rule.required(),
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
      name: "artworkShowcase",
      title: "Artwork showcase",
      type: "gallery",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "collectionDetails",
      title: "Collection details",
      validation: (Rule) => Rule.required(),
      type: "blockContent",
    },
    {
      name: "collectionArtists",
      title: "Artists",
      validation: (Rule) => Rule.required(),
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    },
  ],
};
