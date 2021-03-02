import Layout from "../../components/Layout";
import client from "../api/client";
import gql from "graphql-tag";
import sanity from "../../client";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";
import ArtistSocialIcons from "../../components/ArtistSocialIcons";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export const ALL_ARTISTS_QUERY = gql`
  query allArtists {
    allArtist {
      slug {
        current
      }
    }
  }
`;

export const ARTIST_QUERY = gql`
  query Artist($slug: String) {
    allArtist(where: { slug: { current: { eq: $slug } } }) {
      name
      slug {
        current
      }
      profile {
        asset {
          url
        }
      }
      facebook
      twitter
      instagram
      pinterest
      linkedIn
      website
      artistShowcase {
        caption
        asset {
          url
        }
      }
      bodyRaw
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_ARTISTS_QUERY });
  return {
    paths: data.allArtist.map((params) => `/artists/${params.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: ARTIST_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  const artist = data.allArtist.map((artist) => artist);

  return {
    props: { artist },
  };
}

const Artist = (props) => {
  const artist = props.artist[0];
  const imageUrl = artist.profile.asset.url;
  const name = artist.name;
  const slug = artist.slug.current;

  return (
    <Layout>
      <article className="grid justify-items-center">
        <section className="grid h-80 justify-items-center p-10">
          <h1 className="p-4">{name}</h1>
          <div className="rounded-full w-20 h-20 relative overflow-hidden inline-block my-4 shadow-md">
            <img src={imageUrl} alt={slug} className="h-full w-auto" />
          </div>
          <ArtistSocialIcons {...props} />
        </section>
        {artist.artistShowcase && (
          <Carousel>
            {artist.artistShowcase.map((image, index) => {
              return (
                <div key={index}>
                  <img
                    src={image.asset.url}
                    alt={image.caption || "artist showcase"}
                  />
                </div>
              );
            })}
          </Carousel>
        )}

        <BlockContent
          className="content-editor"
          blocks={artist.bodyRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Artist;
