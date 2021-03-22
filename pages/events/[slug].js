import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import ArtistCard from "../../components/ArtistCard";
import sanity from "../../utils/sanityClient";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";
import Link from "next/link";

export const ALL_EVENTS_QUERY = gql`
  query allEvents {
    allEvent {
      slug {
        current
      }
    }
  }
`;

export const EVENT_QUERY = gql`
  query Event($slug: String) {
    allEvent(where: { slug: { current: { eq: $slug } } }) {
      title
      slug {
        current
      }
      descriptionRaw
      mainImage {
        asset {
          url
        }
        alt
        caption
      }
      eventArtists {
        name
        slug {
          current
        }
        profile {
          asset {
            url
          }
          alt
          caption
        }
      }
      eventPartners {
        name
        slug {
          current
        }
        partnerWebsite
        partnerImage {
          asset {
            url
          }
          alt
        }
      }
      startDate
      endDate
      eventDetailsRaw
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_EVENTS_QUERY });

  return {
    paths: data.allEvent.map((p) => `/events/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: EVENT_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  const event = data.allEvent.map((event) => event);

  return {
    props: { event },
  };
}

const Event = (props) => {
  const event = props.event[0];

  return (
    <Layout {...event}>
      <article>
        <section className="flex flex-col space-y-4 items-center">
          <section className="w-full lg:w-3/5 my-4">
            <img src={event.mainImage.asset.url} alt={event.mainImage.alt} />
            <BlockContent
              className="content-editor"
              blocks={event.eventDetailsRaw}
              serializers={serializers}
              dataset={sanity.clientConfig.dataset}
              projectId={sanity.clientConfig.projectId}
            />
          </section>
          <section className="w-full lg:w-3/5">
            <h2 className="my-4">Featured artists</h2>
            <ul className="flex space-x-4">
              {event.eventArtists.map((eventArtist, index) => {
                //console.log({ ...eventArtist });
                return (
                  <li key={index}>
                    <ArtistCard {...eventArtist} />
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      </article>
    </Layout>
  );
};

export default Event;
