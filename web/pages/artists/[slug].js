import Layout from "../../components/Layout";
import getSanityContent from "../../utils/sanity";
import sanity from "../../client";
import React, { useState } from "react";
const BlockContent = require("@sanity/block-content-to-react");

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query allArtists {
         allArtist {
              slug {
                current
              }
          }
      }
    `,
  });

  return {
    paths: data.allArtist.map((params) => `/artists/${params.slug.current}`),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
      query Artist($slug: String) {
        allArtist(where: {slug: {current: {eq: $slug}}}) {
          name
          slug {
            current
          }
          profile {
            asset {
              url
            }
          }
          facebook
          twitter
          instagram
          pinterest
          linkedIn
          artistShowcase {
            caption
            asset {
              url
            }
          }
          bodyRaw
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });

  const artist = data.allArtist.map((artist) => artist);

  return {
    props: { artist },
  };
}

const Artist = (props) => {
  const artist = props.artist[0];
  const imageUrl = artist.profile.asset.url;
  const name = artist.name;
  const slug = artist.slug.current;
  const facebook = artist.facebook;
  const instagram = artist.instagram;
  const linkedIn = artist.linkedIn;
  const pinterest = artist.pinterest;
  const twitter = artist.twitter;
  const website = artist.website;
  const youtube = artist.youtube;

  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);

  const handleClickImage = (e) => {
    const currentIndex = e.currentTarget.dataset.image_index;
    setFeaturedImageIndex(currentIndex);
  };

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

  return (
    <Layout>
      <article className="grid justify-items-center">
        <section className="grid h-80 justify-items-center p-10">
          <h1 className="p-4">{name}</h1>
          <div className="rounded-full w-20 h-20 relative overflow-hidden inline-block my-4 shadow-md">
            <img src={imageUrl} alt={slug} className="h-full w-auto" />
          </div>
          <ul className="flex space-x-2">
            <li className="hover:text-secondary500 transition duration-200 ease-in-out">
              <a href={website}>
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-8"
                >
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" />
                </svg>
              </a>
            </li>
            <li>
              <a href={facebook}>
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
              <a href={instagram}>
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  className="w-8"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 13c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5zm1.57 0A3.434 3.434 0 0013 16.43 3.434 3.434 0 0016.43 13 3.434 3.434 0 0013 9.57 3.434 3.434 0 009.57 13z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.368 3h8.265A5.373 5.373 0 0122 8.367v8.265A5.374 5.374 0 0116.633 22H8.368A5.374 5.374 0 013 16.632V8.367A5.374 5.374 0 018.368 3zm8.265 17.466a3.838 3.838 0 003.834-3.834V8.367a3.838 3.838 0 00-3.834-3.834H8.368a3.838 3.838 0 00-3.834 3.834v8.265a3.838 3.838 0 003.834 3.834h8.265z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href={linkedIn}>
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 25 25"
                  className="w-8"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.072 10.912a.072.072 0 01.023-.035v.035h-.023zm7.948 9.419h-3.855v-5.892c0-1.48-.566-2.499-1.965-2.499-1.073 0-1.7.686-1.976 1.35-.101.227-.128.557-.128.889v6.152H9.23s.049-9.986 0-11.016h3.865v1.562c.507-.75 1.425-1.823 3.477-1.823 2.544 0 4.447 1.575 4.447 4.96v6.317zM5.16 7.811h-.025C3.838 7.812 3 6.96 3 5.907 3 4.823 3.864 4 5.185 4c1.322 0 2.136.823 2.16 1.906.001 1.053-.836 1.906-2.184 1.906zm-1.928 12.52h3.863V9.315H3.232V20.33z"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a href={pinterest}>
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
            <li>
              <a href={twitter}>
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
              <a href={youtube}>
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -5 25 25"
                  className="w-8"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.54 2.42a2.78 2.78 0 00-1.94-2C19.88 0 13 0 13 0S6.12 0 4.4.46a2.78 2.78 0 00-1.94 2A29 29 0 002 7.75a29 29 0 00.46 5.33A2.78 2.78 0 004.4 15c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2c.313-1.732.467-3.49.46-5.25a29.005 29.005 0 00-.46-5.33z"
                  />
                  <path
                    d="M10.75 11.02l5.75-3.27-5.75-3.27v6.54z"
                    className="text-gray-700"
                    fillOpacity=".87"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </section>
        <div className="hidden md:block max-w-5xl">
          <img
            src={artist.artistShowcase[featuredImageIndex].asset.url}
            alt="featured image"
          />
          <p className="text-center italic text-gray-200 mt-2">
            {artist.artistShowcase[featuredImageIndex].caption}
          </p>
        </div>
        <ul className="grid md:grid-flow-col w-full md:w-2/3 md:grid-rows-2 lg:grid-rows-1 lg:w-2/5 mt-10 gap-4">
          {artist.artistShowcase.map((image, index) => {
            return (
              <li
                onClick={handleClickImage}
                data-image_index={index}
                key={index}
                value={index}
                className="flex"
              >
                <img
                  className={
                    index == featuredImageIndex
                      ? "sm:border-2  sm:border-primary600"
                      : ""
                  }
                  src={image.asset.url}
                  alt={image.caption || "artist showcase"}
                />
              </li>
            );
          })}
        </ul>

        <BlockContent
          className="artist-bio"
          blocks={artist.bodyRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </Layout>
  );
};

export default Artist;
