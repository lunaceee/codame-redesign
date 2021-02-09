import getSanityContent from "../../utils/sanity";
import Layout from "../../components/Layout";
import sanity from "../../client";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query allPosts {
        allPost {
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
      query PostBySlug($slug: String) {
        allPost(where: {slug: {current: {eq: $slug}}}){
          title
          author {
            name
          }
          categories {
            title
          }
          bodyRaw
          publishedAt
          mainImage {
            asset {
              url
            }
          }
          slug {
            current
          }
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const post = data.allPost.map((post) => post);

  return {
    props: { post },
  };
}

const Post = (props) => {
  const post = props.post[0];

  return (
    <Layout>
      <article>
        <section>
          <h1>{post.title}</h1>
        </section>
        <BlockContent
          className="content-editor"
          blocks={post.bodyRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Post;
