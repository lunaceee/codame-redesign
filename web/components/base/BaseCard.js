import classNames from "classnames";

const BaseCard = (props) => {
  const VARIANT_MAPS = {
    artist: "md:w-3/4 lg:w-5/6",
    event: "md:w-1/3 lg:2-3/4",
    editorial: "md:w-5/6 lg:w-7/8",
  };

  const [isArtist, isEvent, isEditorial] = props;

  const cardStyle = classNames({
    isArtist: VARIANT_MAPS[artist],
  });

  return (
    <div className={cardStyle}>
      <img src="" alt="" />
      <h4>title</h4>
      <p>something something</p>
    </div>
  );
};

export default BaseCard;
