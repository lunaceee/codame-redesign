export default {
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
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
    },
    {
      name: "eventArtists",
      title: "Event artists",
      type: "array",
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
      type: "datetime",
    },
    {
      name: "endDate",
      title: "End date",
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
      of: [{ title: "Tag", type: "reference", to: { type: "category" } }],
    },
    {
      name: "eventDetails",
      title: "Event details",
      type: "blockContent",
    },
  ],
};
