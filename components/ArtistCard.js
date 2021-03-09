import Link from "next/link"

const ArtistCard = (artist) => {
  console.log("artist child", artist);
  const {name, profile, slug} = artist
  return (
    <Link href={`/artists/${slug.current}`}>
      <a className="w-32 h-48 p-2 gap-2 flex flex-col items-center rounded shadow-lg overflow-hidden border border-gray-600">
        <img
          className="h-20 w-full object-cover"
          src={profile.asset.url}
          alt={profile.alt}
        />
        <p>{name}</p>
      </a>
    </Link>
  );
};

export default ArtistCard;
