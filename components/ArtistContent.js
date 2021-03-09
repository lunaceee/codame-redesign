const BlockContent = require("@sanity/block-content-to-react");
import serializers from "../utils/serializers";
import ArtistSocialIcons from "./ArtistSocialIcons";

const ArtistContent = (props) => {
  const artist = props[0];
  const { name, slug, imageUrl } = artist;
  return (
    <main className="w-full max-w-7xl mx-auto bg-gray-900">
      <article className="grid justify-items-center">
        <section className="grid h-80 justify-items-center p-10">
          <h1 className="p-4">{name}</h1>
          <div className="rounded-full w-20 h-20 relative overflow-hidden inline-block my-4 shadow-md">
            <img src={imageUrl} alt={slug} className="h-full w-auto" />
          </div>
          <ArtistSocialIcons {...props} />
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
          blocks={artist.artistDetailsRaw}
          serializers={serializers}
          dataset={sanity.clientConfig.dataset}
          projectId={sanity.clientConfig.projectId}
        />
      </article>
    </main>
  );
};

export default ArtistContent;
