export default {
  name: "contact",
  title: "Contact",
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
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      validation: (Rule) =>
        Rule.warning("Description can't exceed 500 characters").max(500),
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
      name: "mainImage",
      title: "Main image",
      type: "contentImage",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "tag" } }],
    },
    {
      name: "contactDetails",
      title: "Contact details",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
