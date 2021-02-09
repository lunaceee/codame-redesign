import getSanityContent from "../../utils/sanity";

export default function Post(props) {
  console.log(props);
  return <div>{JSON.stringify(props)}</div>;
}

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query allPosts {
        allPost {
          title
          slug {
            current
          }
        }
      }
    `,
  });

  const posts = data.allPost;

  return {
    paths: posts.map((p) => `/posts/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
      query PostBySlug($slug: String!) {
        allPost(filter: {slug: {eq: $slug}) {
          title
          slug {
            current
          }
          author {
            name
          }
          bodyRaw
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const [postData] = data.allPost;

  // const content = await renderToString(pageData.content, {
  //   components: { Callout },
  // });

  return {
    props: {
      title: postData.title,
      bio: postData.bodyRaw.children.text,
    },
  };
}
