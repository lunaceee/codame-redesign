import Link from "next/link";
import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

export const ALL_PARTNERS_QUERY = gql`
  query Partners {
    allPartner {
      name
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_PARTNERS_QUERY,
  });

  const partners = data.allPartner.map((partner) => ({
    name: partner.name,
    slug: partner.slug.current,
  }));

  return {
    props: { partners },
  };
}

export default function Contact(props) {
  //console.log(props);
  return (
    <Layout {...props}>
      <ul>
        {props.partners.map(({ name, slug }) => (
          <li key={slug}>
            <Link href={`/partners/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
