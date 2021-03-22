import Link from "next/link";
import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

export const ALL_SPONSORS_QUERY = gql`
  query Sponsors {
    allSponsor {
      name
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_SPONSORS_QUERY,
  });

  const sponsors = data.allSponsor.map((sponsor) => ({
    name: sponsor.name,
    slug: sponsor.slug.current,
  }));

  console.log(sponsors);

  return {
    props: { sponsors },
  };
}

export default function Sponsors({ sponsors }) {
  console.log("sponsors", sponsors);
  return (
    <Layout {...sponsors}>
      <ul>
        {sponsors.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/sponsors/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
