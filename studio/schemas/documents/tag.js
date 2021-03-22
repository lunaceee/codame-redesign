export default {
  name: "tag",
  title: "Tag",
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
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 60,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};
