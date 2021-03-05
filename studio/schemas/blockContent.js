/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */

export default {
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "H5", value: "h5" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],

      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: "External link",
            name: "externalLink",
            type: "object",
            blockEditor: {
              icon: () => "EL",
            },
            fields: [
              {
                title: "External link",
                name: "href",
                type: "url",
              },
              {
                title: "Open in new tab",
                name: "blank",
                description: "Read https://css-tricks.com/use-target_blank/",
                type: "boolean",
              },
            ],
          },
          {
            title: "Highlight",
            name: "highlight",
            type: "object",
            fields: [{ name: "text", type: "string" }],
          },
          {
            name: "internalLinkArticle",
            type: "object",
            title: "Internal Link to Article",
            blockEditor: {
              icon: () => "IA",
            },
            fields: [
              {
                name: "article",
                type: "reference",
                to: [{ type: "post" }],
              },
            ],
          },
          {
            name: "button",
            type: "object",
            title: "CTA button",
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
          },
        ],
      },
    },
    {
      title: "Article image",
      type: "contentImage",
      options: { hotspot: true },
    },
  ],
};
