import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";

export const ALL_PROJECTS_QUERY = gql`
  query allProjects {
    allProject {
      slug {
        current
      }
    }
  }
`;

export const PROJECT_QUERY = gql`
  query Project($slug: String) {
    allProject(where: { slug: { current: { eq: $slug } } }) {
      title
      slug {
        current
      }
      descriptionRaw
      mainImage {
        asset {
          url
          size
        }
        alt
      }
      categories {
        title
      }
      bodyRaw
    }
  }
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_PROJECTS_QUERY });

  return {
    paths: data.allProject.map((p) => `/projects/${p.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: PROJECT_QUERY,
    variables: {
      slug: params.slug,
    },
  });

  const project = data.allProject.map((project) => project);

  return {
    props: { project },
  };
}

const Project = (props) => {
  const project = props.project[0];

  return (
    <Layout>
      <article>
        <section className="grid justify-items-center">
          <h1>{project.title}</h1>
          <div className="w-full lg:w-5/6 overflow-hidden my-4">
            <img
              src={project.mainImage.asset.url}
              alt={project.mainImage.alt}
            />
          </div>
        </section>
        <BlockContent
          className="content-editor"
          blocks={project.bodyRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Project;
