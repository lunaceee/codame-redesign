const Header = (props) => {
  const { title, name, profile, slug } = props;
  let imageUrl;
  if (profile) {
    imageUrl = profile.asset.url;
  }

  //console.log(props);

  return (
    <section className="grid h-80 justify-items-center p-10 items-center">
      {title && <h1 className="p-4">{title}</h1>}
      {name && <h1 className="p-4">{name}</h1>}
      {profile && (
        <div className="rounded-full w-20 h-20 relative overflow-hidden inline-block my-4 shadow-md">
          <img src={imageUrl} alt={slug} className="h-full w-auto" />
        </div>
      )}
    </section>
  );
};

export default Header;
