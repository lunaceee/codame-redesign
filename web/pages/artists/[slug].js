const Artist = (props) => {
  const [
    gallery,
    image,
    title,
    website,
    twitter,
    facebook,
    linkedIn,
    instagram,
    pinterest,
    block,
  ] = props;
  return (
    <div>
      <h1>{title}</h1>
      <img src={image} alt={title} />
      <ul>
        {facebook && <li>{facebook}</li>}
        {linkedIn && <li>{linkedIn}</li>}
        {instagram && <li>{instagram}</li>}
        {pinterest && <li>{pinterest}</li>}
        {twitter && <li>{twitter}</li>}
        {website && <li>{website}</li>}
      </ul>
      <div>{gallery}</div>
      <div>{block}</div>
    </div>
  );
};

export default Artist;
