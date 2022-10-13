import { Link } from "react-router-dom";

const SideOptions = ({
  classes,
  setShowPage,
  imageSource,
  imageAlt,
  text,
  val,
  path,
}) => {
  return (
    <Link to={path}>
      <div className={classes} onClick={() => setShowPage(val)}>
        <img src={imageSource} alt={imageAlt} />
        <div>{text}</div>
      </div>
    </Link>
  );
};

export default SideOptions;
