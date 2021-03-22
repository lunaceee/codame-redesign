import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";
import Link from "next/link";

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
      projectArtists {
        name
        slug {
          current
        }
        profile {
          asset {
            url
          }
        }
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
      projectDetailsRaw
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

  //console.log(project.projectArtists);

  return (
    <Layout {...project}>
      <article>
        <section className="flex flex-col lg:flex-row space-y-4 lg:space-x-8 justify-center">
          <section className="w-full lg:w-3/5 my-4">
            <img
              src={project.mainImage.asset.url}
              alt={project.mainImage.alt}
            />
            <BlockContent
              className="content-editor"
              blocks={project.projectDetailsRaw}
              serializers={serializers}
              dataset={sanity.clientConfig.dataset}
              projectId={sanity.clientConfig.projectId}
            />
          </section>
          <section>
            <h2 className="my-4">Related artists</h2>
            <ul className="h-40 w-full lg:w-40">
              {project.projectArtists.map((projectArtist, index) => {
                return (
                  <li key={index}>
                    <img
                      src={projectArtist.profile.asset.url}
                      alt={projectArtist.name}
                    />
                    <Link href={`/artists/${projectArtist.slug.current}`}>
                      <h3 className="text-center my-2">{projectArtist.name}</h3>
                    </Link>
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

export default Project;
