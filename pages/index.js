import Link from "next/link";
import getSanityContent from "../utils/sanity";
import Layout from "../components/Layout";

export default function Index({ pages }) {
  return (
    <Layout {...pages}>
      <ul>
        {pages.map(({ title, slug }) => (
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

export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query allPages {
        allPage {
          title
          slug {
            current
          }
        }
      }
    `,
  });

  const pages = data.allPage.map((page) => ({
    title: page.title,
    slug: page.slug.current,
  }));

  return {
    props: { pages },
  };
}
