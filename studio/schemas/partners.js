export default {
  name: "partners",
  title: "Partners",
  type: "array",
  of: [
    {
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
    }
  ],
}