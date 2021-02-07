import Layout from "../../components/Layout";
import getSanityContent from "../../utils/sanity";
import sanity from "../../client";
const BlockContent = require("@sanity/block-content-to-react");

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query allCollections {
         allCollection {
              slug {
                current
              }
          }
      }
    `,
  });

  return {
    paths: data.allCollection.map(
      (params) => `/collections/${params.slug.current}`
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
    query Collection($slug: String) {
      allCollection(where: {slug: {current: {eq: $slug}}}) {
        title
        description
        slug{
          current
        }
        artworkShowcase {
          caption
          asset {
            url
          }
        }
        editorRaw
        artists {
          name
          slug {
            current
          }
        }
      }
    }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const collection = data.allCollection.map((collection) => collection);

  return {
    props: { collection },
  };
}

const Collection = (props) => {
  const collection = props.collection[0];
  const featuredArtist = collection.artists[0];
  const title = collection.title;

  const serializers = {
    marks: {
      link: ({ children, mark }) =>
        mark.blank ? (
          <a
            href={mark.href}
            target="_blank"
            rel="noopener noreferer" //security reason
            className="text-blue-500 underline"
          >
            {children}
          </a>
        ) : (
          <a href={mark.href}>{children}</a>
        ),
    },
  };

  console.log(collection);

  return (
    <Layout>
      <article>
        <section>
          <h1>{title}</h1>
          <ul>
            {collection.artworkShowcase.map((artwork) => {
              return (
                <li>
                  <img src={artwork.asset.url} alt={artwork.caption} />
                </li>
              );
            })}
          </ul>
        </section>
        <BlockContent
          className="collection"
          blocks={collection.editorRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Collection;
