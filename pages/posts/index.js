// index.js
import Link from "next/link";
import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

export const ALL_POSTS_QUERY = gql`
  query allPosts {
    allPost {
      title
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_POSTS_QUERY,
  });

  const posts = data.allPost.map((post) => ({
    title: post.title,
    slug: post.slug.current,
  }));

  return {
    props: { posts },
  };
}

export default function Post({ posts }) {
  return (
    <Layout {...posts}>
      <ul>
        {posts.map(({ title, slug }) => (
          <li key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
