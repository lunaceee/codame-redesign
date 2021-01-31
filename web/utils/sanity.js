async function getSanityContent({ query, variables = {} }) {
  const { data } = await fetch(
    "https://p38n6r66.api.sanity.io/v1/graphql/production/default",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  ).then((response) => response.json());
  return data;
}

export default getSanityContent;
