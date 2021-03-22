import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";

export const ALL_CONTACT_TYPES_QUERY = gql`
  query allContact {
    allContact {
      slug {
        current
      }
    }
  }
`;

export const CONTACT_QUERY = gql`
  query Contact($slug: String) {
    allContact(where: { slug: { current: { eq: $slug } } }) {
      title
      slug {
        current
      }
      descriptionRaw
      mainImage {
        asset {
          url
        }
        caption
        alt
      }
      categories {
        title
        slug {
          current
        }
      }
      contactDetailsRaw
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_CONTACT_TYPES_QUERY });

  return {
    paths: data.allContact.map((p) => `/contact/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: CONTACT_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  const allContact = data.allContact.map((contact) => contact);

  return {
    props: { allContact },
  };
}

const Contact = (props) => {
  const contact = props.allContact[0];

  return (
    <Layout {...contact}>
      <article>
        <img src={contact.mainImage.asset.url} alt={contact.alt} />
        <BlockContent
          className="content-editor"
          blocks={contact.contactDetailsRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Contact;
