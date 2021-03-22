import Link from "next/link";
import client from "./api/client";
import gql from "graphql-tag";
import Layout from "../components/Layout";

export const ALL_PAGES_QUERY = gql`
  query allPages {
    allPage {
      title
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_PAGES_QUERY,
  });

  const pages = data.allPage.map((page) => ({
    title: page.title,
    slug: page.slug.current,
  }));

  return {
    props: { pages },
  };
}

export default function Home({ pages }) {
  return (
    <Layout {...pages}>
      <ul>
        {pages.map(({ title, slug }) => (
          <li key={slug}>
            <Link href={`/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
