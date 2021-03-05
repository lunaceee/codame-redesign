import Layout from "../../components/Layout";
import sanity from "../../utils/sanityClient";
import client from "../api/client";
import gql from "graphql-tag";
const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../../utils/serializers";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Button from "../../components/Button";

export const ALL_COLLECTIONS_QUERY = gql`
  query allCollections {
    allCollection {
      slug {
        current
      }
    }
  }
`;

export const COLLECTION_QUERY = gql`
  query Collection($slug: String) {
    allCollection(where: { slug: { current: { eq: $slug } } }) {
      title
      description
      slug {
        current
      }
      tags {
        title
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
`;

export async function getStaticPaths() {
  const { data } = await client.query({ query: ALL_COLLECTIONS_QUERY });
  return {
    paths: data.allCollection.map(
      (params) => `/collections/${params.slug.current}`
    ),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: COLLECTION_QUERY,
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
  const featuredArtist = collection.artists;
  const title = collection.title;
  const description = collection.description;
  const tags = collection.tags;

  console.log(collection);

  return (
    <Layout>
      <article className="grid justify-items-center">
        <section className="grid h-80 justify-items-center p-10 items-center">
          <h1 className="p-4">{title}</h1>
        </section>
        <div className="flex flex-col lg:flex-row lg:space-x-4 lg:mx-8">
          <div className="w-full md:max-w-2xl">
            <Carousel>
              {collection.artworkShowcase.map((artwork) => {
                return (
                  <img
                    key={artwork.asset.url}
                    src={artwork.asset.url}
                    alt={artwork.caption}
                  />
                );
              })}
            </Carousel>
            <div className="flex flex-wrap justify-start space-x-2 my-10">
              {tags.map((tag) => {
                return (
                  <div
                    className="rounded-full px-4 py-2 bg-secondary800 max-w-40 w-auto"
                    key={tag.title}
                  >
                    {tag.title}
                  </div>
                );
              })}
            </div>
            <div className="p-2">
              <h3 className="p-2">Share with friends</h3>
              <ul className="flex">
                <li>
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      className="w-8"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M13.935 9.155V7.182c0-.74.499-.914.853-.914h2.163V3.012L13.97 3c-3.307 0-4.058 2.43-4.058 3.982v2.17H8v3.354h1.913V22h4.022v-9.494h2.714L17 9.156h-3.065z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      className="w-8"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.068 9.227C20.068 14.23 16.148 20 8.976 20c-2.202 0-4.25-.624-5.976-1.702a7.966 7.966 0 005.772-1.567c-1.705-.032-3.144-1.125-3.64-2.63.236.045.48.067.732.067.353 0 .7-.045 1.026-.133-1.782-.346-3.127-1.876-3.127-3.711 0-.017 0-.032.003-.049a3.933 3.933 0 001.766.472 3.754 3.754 0 01-1.736-3.151c0-.693.193-1.343.527-1.903a11.178 11.178 0 008.034 3.957 3.697 3.697 0 01-.1-.864c0-2.09 1.745-3.786 3.898-3.786 1.122 0 2.134.46 2.843 1.194a7.848 7.848 0 002.48-.919 3.827 3.827 0 01-1.716 2.097A7.903 7.903 0 0022 6.777a7.814 7.814 0 01-1.942 1.958c.006.161.01.326.01.492z"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 25 25"
                      className="w-8"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.005 21.104c-.095-.867-.182-2.198.039-3.144.199-.856 1.285-5.449 1.285-5.449S10 11.854 10 10.884c0-1.525.883-2.662 1.983-2.662.935 0 1.387.702 1.387 1.544 0 .94-.599 2.346-.908 3.65-.258 1.09.548 1.98 1.623 1.98 1.949 0 3.446-2.054 3.446-5.02 0-2.624-1.886-4.459-4.578-4.459-3.12 0-4.95 2.34-4.95 4.757 0 .942.363 1.952.816 2.502.09.108.102.203.076.314-.083.346-.268 1.09-.305 1.243-.047.2-.158.243-.366.146C6.855 14.242 6 12.242 6 10.633 6 7.175 8.512 4 13.243 4 17.045 4 20 6.71 20 10.33c0 3.778-2.382 6.818-5.688 6.818-1.11 0-2.155-.576-2.512-1.258 0 0-.55 2.093-.683 2.606-.248.952-.916 2.145-1.363 2.873-.212.243-.713.083-.749-.265z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="">
            <div className="md:mb-4 md:ml-4">
              <Button size="lg" type="primary">
                Get a quote
              </Button>
            </div>
            <BlockContent
              className="content-editor"
              blocks={collection.editorRaw}
              serializers={serializers}
              dataset={sanity.clientConfig.dataset}
              projectId={sanity.clientConfig.projectId}
            />
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Collection;
