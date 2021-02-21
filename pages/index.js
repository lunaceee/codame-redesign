import Link from "next/link";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Layout from "../components/Layout";

export const ALL_PAGES_QUERY = gql`
  query allPages {
    allPage {
      title
      slug {
        current
      }
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(ALL_PAGES_QUERY);
  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;
  return (
    <Layout>
      <ul>
        {data &&
          data.allPage.map(({ title, slug }) => (
            <li key={slug}>
              <Link href={`/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
      </ul>
    </Layout>
  );
}
