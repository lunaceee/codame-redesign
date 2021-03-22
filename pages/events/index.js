import Link from "next/link";
import Layout from "../../components/Layout";
import client from "../api/client";
import gql from "graphql-tag";

export const ALL_EVENTS_QUERY = gql`
  query allEvents {
    allEvent {
      title
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_EVENTS_QUERY,
  });

  const events = data.allEvent.map((event) => ({
    title: event.title,
    slug: event.slug.current,
  }));

  return {
    props: { events },
  };
}

export default function Events(props) {
  return (
    <Layout {...props}>
      <ul>
        {props.events.map(({ title, slug }) => (
          <li key={slug}>
            <Link href={`/events/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
