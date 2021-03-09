import gql from "graphql-tag";
import client from "../api/client";
import Layout from "../../components/Layout";
import Link from "next/link";

export const ALL_ARTISTS_QUERY = gql`
  query allArtists {
    allArtist {
      name
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_ARTISTS_QUERY,
  });

  const artists = data.allArtist.map((artists) => artists);

  return {
    props: { artists },
  };
}

const Artists = (props) => {
  return (
    <Layout>
      <ul>
        {props.artists.map(({ name, slug }) => (
          <li key={name}>
            <Link href={`/artists/${slug}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Artists;
