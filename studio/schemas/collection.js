export default {
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    },
    {
      name: "artists",
      title: "Artists",
      type: "array",
      validation: (Rule) =>
        Rule.unique().error("An artist can only appear once in this field"),
      of: [
        {
          type: "reference",
          to: [{ type: "artist" }],
        },
      ],
    },
  ],
};
