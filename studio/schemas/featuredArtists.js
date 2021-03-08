export default {
  name: "featuredArtists",
  title: "Featured artists",
  type: "array",
  of: [
    {
      title: "Artist",
      type: "reference",
      to: [{ type: "artist" }],
    },
  ],
}