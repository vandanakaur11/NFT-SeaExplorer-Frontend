import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import logoNew2 from "./../../assets/images/logoNew2.png";
import { useNavigate } from "react-router-dom";
// import tickIcon from "./../../assets/images/tickIcon.png";
import congratsPic from "./../../assets/images/congratsPic.png";
import classes from "./Verify.module.css";
import api from "../../services/api";

const Verify = () => {
  const history = useNavigate();
  const { id, token } = useParams();

  console.log("id >>>>>>>>>>", id);
  console.log("token >>>>>>>>>>", token);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await api.patch(`/v1/users/verify/${id}/${token}`);
      console.log("verifyUser res >>>>>>>>>>", res);
    } catch (error) {
      console.error("verifyUser error >>>>>>>>>>>", error);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.logo} onClick={() => history("/")}>
        <img src={logoNew2} alt="" />
      </div>
      <div className={classes.modal}>
        <img src={congratsPic} alt="congrats-icon" />
        <h3>Your account has been successfully verified.</h3>
        <div>
          Now,{" "}
          <Link to="/" alt="">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
