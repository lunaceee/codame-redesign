import Link from "next/link";
import client from "../api/client";
import gql from "graphql-tag";
import Layout from "../../components/Layout";

export const ALL_PROJECTS_QUERY = gql`
  query allProjects {
    allProject {
      title
      slug {
        current
      }
    }
  }
`;

export async function getStaticProps() {
  const { data } = await client.query({
    query: ALL_PROJECTS_QUERY,
  });

  const projects = data.allProject.map((projects) => projects);

  return {
    props: { projects },
  };
}

export default function Projects({ projects }) {
  return (
    <Layout {...projects}>
      <ul>
        {projects.map(({ title, slug }) => (
          <li key={slug}>
            <Link href={`/projects/${slug}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
