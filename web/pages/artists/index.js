import groq from "groq";
import Artist from "../../components/Artist";
import client from "../../client";

const Index = (props) => {
  const { artists = [] } = props;
  return (
    <div>
      <h2>Featured artists</h2>
      <ul className="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {artists &&
          artists.map((artist) => {
            return (
              <li key={artist.name}>
                <Artist {...artist} />
              </li>
            );
          })}{" "}
      </ul>
    </div>
  );
};

Index.getInitialProps = async () => {
  const query = {
    artists: await client.fetch(groq`
      *[_type == "artist"]{
        name,
        "imageUrl": image.asset->url, 
        "latestCollection": *[ _type == "collection" && references(^._id)] | order(_updatedAt asc)[0]{
          title, 
          description,
          "thumbnailUrl": thumbnail.asset->url,
        }
      }
    `),
  };
  return query;
};

export default Index;
