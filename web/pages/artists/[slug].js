import { serializers } from "@sanity/block-content-to-react/lib/targets/dom";
import artist from "../../../studio/schemas/artist";
import Layout from "../../components/Layout";
import getSanityContent from "../../utils/sanity";
import sanity from "../../client";
const BlockContent = require("@sanity/block-content-to-react");

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
          gallery {
            asset {
              url
              title
            }
          }
          bodyRaw
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

  const serializers = {
    types: {
      artistBio: (props) => <div>{props.node._type}</div>,
    },
  };

  return (
    <article>
      <h1>{name}</h1>
      <div>
        <img src={imageUrl} alt={slug} />
      </div>
      <ul>
        <li>{facebook}</li>
        <li>{instagram}</li>
        <li>{linkedIn}</li>
        <li>{pinterest}</li>
        <li>{twitter}</li>
      </ul>
      <ul>
        {artist.gallery.map((image) => (
          <li key={image.asset.url}>
            <img
              src={image.asset.url}
              alt={image.asset.title || "artist showcase"}
            />
          </li>
        ))}
      </ul>
      <BlockContent
        blocks={artist.bodyRaw}
        serializers={serializers}
        dataset={sanity.clientConfig.dataset}
        projectId={sanity.clientConfig.projectId}
      />
    </article>
  );
};

export default Artist;
