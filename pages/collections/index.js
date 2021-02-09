// index.js
import Link from "next/link";
import getSanityContent from "../../utils/sanity";
import Layout from "../../components/Layout";

export default function Index({ collections }) {
  return (
    <Layout>
      <ul>
        {collections.map(({ title, slug }) => (
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
      query allCollections {
        allCollection {
          title
          slug {
            current
          }
        }
      }
    `,
  });

  const collections = data.allCollection.map((collection) => ({
    title: collection.title,
    slug: collection.slug.current,
  }));

  return {
    props: { collections },
  };
}
