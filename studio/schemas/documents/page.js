export default {
  name: "page",
  title: "Page",
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
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
  ],
};
