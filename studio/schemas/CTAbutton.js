export default {
  name: "button",
  type: "object",
  title: "CTA button",
  blockEditor: {
    icon: () => CTAicon,
  },
  fields: [
    {
      title: "URL",
      name: "href",
      type: "url",
    },
    {
      title: "Open in new tab",
      name: "blank",
      description: "Read https://css-tricks.com/use-target_blank/",
      type: "boolean",
    },
    {
      title: "Center",
      name: "center",
      type: "boolean",
    },
    {
      title: "Right",
      name: "right",
      type: "boolean",
    },
    {
      title: "Left",
      name: "left",
      type: "boolean",
    },
  ],
}