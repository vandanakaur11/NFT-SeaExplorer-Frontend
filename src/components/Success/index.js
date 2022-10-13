import { Link, useNavigate } from "react-router-dom";
import logoNew2 from "./../../assets/images/logoNew2.png";
import tickIcon from "./../../assets/images/tickIcon.png";
import classes from "./Success.module.css";

const Success = () => {
  const history = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.logo} onClick={() => history("/")}>
        <img src={logoNew2} alt="" />
      </div>
      <div className={classes.modal}>
        <h1>Success!</h1>
        <img src={tickIcon} alt="success-icon" />

        <div style={{ textAlign: "center" }}>
          <h3>Your account has been created successfully.</h3>
          <h3>Please check your email for verification</h3>
        </div>

        <Link to="/">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default Success;
