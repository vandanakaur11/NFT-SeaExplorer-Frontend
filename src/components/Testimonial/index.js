import Carousel from "./../Carousel";
import classes from "./Testimonial.module.css";

const Testimonial = () => {
  return (
    <div className={classes.main}>
      <div>Testimonials</div>
      <div className={classes.card}>
        <Carousel data={"test"} />
      </div>
    </div>
  );
};

export default Testimonial;
