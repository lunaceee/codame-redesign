import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import sanity from "../../client";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";

export const ALL_POSTS_QUERY = gql`
  query allPosts {
    allPost {
      slug {
        current
      }
    }
  }
`;

export const POST_QUERY = gql`
  query Post($slug: String) {
    allPost(where: { slug: { current: { eq: $slug } } }) {
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
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_POSTS_QUERY });

  return {
    paths: data.allPost.map((p) => `/posts/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: POST_QUERY,
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
