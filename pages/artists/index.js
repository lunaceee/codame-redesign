import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

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

function ArtistIndex() {
  const { loading, error, data } = useQuery(ALL_ARTISTS_QUERY);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
  return (
    <Layout>
      <ul>
        {data &&
          data.allArtist.map((artist, index) => (
            <li key={index}>{artist.name}</li>
          ))}
      </ul>
    </Layout>
  );
}

export default ArtistIndex;
