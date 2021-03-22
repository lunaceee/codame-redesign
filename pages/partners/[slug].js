import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";

export const ALL_PARTNERS_QUERY = gql`
  query Partners {
    allPartner {
      slug {
        current
      }
    }
  }
`;

export const PARTNER_QUERY = gql`
  query Partner($slug: String) {
    allPartner(where: { slug: { current: { eq: $slug } } }) {
      name
      slug {
        current
      }
      partnerImage {
        asset {
          url
        }
        caption
        alt
      }
      partnerWebsite
      partnerDetailsRaw
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_PARTNERS_QUERY });

  return {
    paths: data.allPartner.map((p) => `/partners/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: PARTNER_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  const partners = data.allPartner.map((partner) => partner);

  //console.log(partners);

  return {
    props: { partners },
  };
}

const Partner = (props) => {
  const partner = props.partners[0];

  return (
    <Layout {...partner}>
      <article>
        <p>Website: {partner.partnerWebsite}</p>
        <img
          src={partner.partnerImage.asset.url}
          alt={partner.partnerImage.alt}
        />
        <BlockContent
          className="content-editor"
          blocks={partner.partnerDetailsRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Partner;
