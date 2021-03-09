import Link from "next/link";
import Layout from "../../components/Layout";
import client from "../api/client";
import gql from "graphql-tag";

export const ALL_COLLECTIONS_QUERY = gql`
  query allCollections {
    allCollection {
      title
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_COLLECTIONS_QUERY,
  });

  const collections = data.allCollection.map((collection) => ({
    title: collection.title,
    slug: collection.slug.current,
  }));

  return {
    props: { collections },
  };
}

export default function Collection({ collections }) {
  return (
    <Layout>
      <ul>
        {collections.map(({ title, slug }) => {
          return (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}
