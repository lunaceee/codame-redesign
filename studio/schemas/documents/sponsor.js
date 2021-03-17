export default {
  name: "sponsor",
  title: "Sponsor",
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
      },
    },
    {
      name: "url",
      title: "Url",
      type: "url",
    },
    {
      name: "sponsorImage",
      title: "Sponsor image",
      type: "contentImage",
    },
  ],
};
