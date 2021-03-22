import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";

export const ALL_SPONSORS_QUERY = gql`
  query Sponsors {
    allSponsor {
      slug {
        current
      }
    }
  }
`;

export const SPONSOR_QUERY = gql`
  query Sponsor($slug: String) {
    allSponsor(where: { slug: { current: { eq: $slug } } }) {
      name
      slug {
        current
      }
      sponsorImage {
        asset {
          url
        }
        caption
        alt
      }
      sponsorWebsite
      sponsorDetailsRaw
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_SPONSORS_QUERY });

  return {
    paths: data.allSponsor.map((p) => `/sponsors/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: SPONSOR_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  const sponsors = data.allSponsor.map((sponsor) => sponsor);

  return {
    props: { sponsors },
  };
}

const Sponsor = (props) => {
  const sponsor = props.sponsors[0];

  return (
    <Layout {...sponsor}>
      <article>
        <p>Website: {sponsor.sponsorWebsite}</p>
        <img
          src={sponsor.sponsorImage.asset.url}
          alt={sponsor.sponsorImage.alt}
        />

        <BlockContent
          className="content-editor"
          blocks={sponsor.sponsorDetailsRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Sponsor;
