// index.js
import Link from "next/link";
import getSanityContent from "../../utils/sanity";
import Layout from "../../components/Layout";

export default function Index({ posts }) {
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

export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query allPosts {
        allPost {
          _id
          title
          slug {
            current
          }
        }
      }
    `,
  });

  const posts = data.allPost.map((post) => ({
    title: post.title,
    slug: post.slug.current,
  }));

  return {
    props: { posts },
  };
}
