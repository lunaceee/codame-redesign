import Layout from "../../components/Layout";
import getSanityContent from "../../utils/sanity";

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query allArtists {
         allArtist {
              slug {
                current
              }
          }
      }
    `,
  });

  return {
    paths: data.allArtist.map((params) => `/artists/${params.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
      query AllArtists($slug: String) {
        allArtist(where: {slug: {current: {eq: $slug}}}) {
          name
          slug {
            current
          }
          image {
            asset {
              url
            }
          }
          facebook
          twitter
          instagram
          pinterest
          linkedIn
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const artist = data.allArtist.map((artist) => {
    return artist;
  });

  return {
    props: { artist },
  };
}

const Artist = (props) => {
  const artist = props.artist[0];
  const imageUrl = artist.image.asset.url;
  const name = artist.name;
  const slug = artist.slug.current;
  const facebook = artist.facebook;
  const instagram = artist.instagram;
  const linkedIn = artist.linkedIn;
  const pinterest = artist.pinterest;
  const twitter = artist.twitter;

  return (
    <ul>
      <li>{name}</li>
      <li>
        <img src={imageUrl} alt={slug} />
      </li>
      <li>{facebook}</li>
      <li>{instagram}</li>
      <li>{linkedIn}</li>
      <li>{pinterest}</li>
      <li>{twitter}</li>
    </ul>
  );
};

export default Artist;
