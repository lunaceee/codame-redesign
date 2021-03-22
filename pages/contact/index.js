import Link from "next/link";
import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

export const ALL_CONTACT_TYPES_QUERY = gql`
  query allContactTypes {
    allContact {
      title
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_CONTACT_TYPES_QUERY,
  });

  const allContactTypes = data.allContact.map((contact) => ({
    title: contact.title,
    slug: contact.slug.current,
  }));

  return {
    props: { allContactTypes },
  };
}

export default function Contact(props) {
  //console.log(props);
  return (
    <Layout {...props}>
      <ul>
        {props.allContactTypes.map(({ title, slug }) => (
          <li key={slug}>
            <Link href={`/contact/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
