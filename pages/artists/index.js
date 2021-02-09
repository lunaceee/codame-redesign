import getSanityContent from "../../utils/sanity";
import Layout from "../../components/Layout";

export default function Index({ artists }) {
  console.log({ artists });
  return (
    <Layout {...artists}>
      <h2>Featured artists</h2>
      <ul className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {artists.map((artist) => {
          return (
            <li key={artist.slug}>
              <h3>{artist.title}</h3>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query allArtists {
        allArtist {
          name
          slug {
            current
          }
        }
      }
    `,
  });

  const artists = data.allArtist.map((artist) => ({
    title: artist.name,
    slug: artist.slug.current,
  }));

  return {
    props: { artists },
  };
}
