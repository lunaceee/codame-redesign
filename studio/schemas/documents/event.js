export default {
  name: "event",
  title: "Event",
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
      name: "eventArtists",
      title: "Event artists",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    },
    {
      name: "eventPartners",
      title: "Event partners",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partner" }] }],
    },
    {
      name: "startDate",
      title: "Start date",
      validation: (Rule) => Rule.required(),
      type: "datetime",
    },
    {
      name: "endDate",
      title: "End date",
      validation: (Rule) => Rule.required(),
      type: "datetime",
    },
    {
      name: "buyButton",
      title: "Buy button",
      type: "button",
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ title: "Tag", type: "reference", to: { type: "tag" } }],
    },
    {
      name: "eventDetails",
      title: "Event details",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    },
  ],
};
