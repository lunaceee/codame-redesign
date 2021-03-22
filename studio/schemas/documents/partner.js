export default {
  name: "partner",
  title: "Partner",
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
      name: "partnerWebsite",
      title: "Partner website",
      type: "url",
    },
    {
      name: "partnerImage",
      title: "Partner image",
      type: "contentImage",
    },
    {
      name: "partnerDetails",
      title: "Partner Details",
      type: "blockContent",
    },
  ],
};
