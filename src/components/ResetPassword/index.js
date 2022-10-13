import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import logoNew1 from "../../assets/images/logoNew1.png";
import api from "../../services/api";
import classes from "./ResetPassword.module.css";

const ResetPassword = () => {
  const history = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const choosePath = (path) => {
    // if (path === "chooseNewPass") {
    //     history("/auth/chooseNewPass");
    // }
  };

  const resetPassowrd = async (body) => {
    const userId = sessionStorage.getItem("userId");

    try {
      const res = await api.patch(`/v1/users/update-password/${userId}`, body);

      console.log("res >>>>>>>>>", res);

      if (res.data.status === "success") {
        history("/dashboard");
      }
    } catch (error) {
      console.error("resetPassword error >>>>>>", error);
    }
  };

  const gotoDashboard = () => {
    history("/");
  };

  return (
    <div className={classes.main}>
      <div onClick={() => gotoDashboard()}>
        <img src={logoNew1} alt="" className={classes.logoImage} />
      </div>
      <div className={classes.mainWrap}>
        <h1>Choose New Password</h1>
        {/* <form autoComplete="off" onSubmit={handleSubmit(resetPassowrd)}>
                <div className={classes.innerWrap}>
                    <div className={classes.inpWrap}>
                        <img src={lockIcon} alt="" />
                        <input type="password" placeholder="Choose New Password" />
                    </div>
                    <div className={classes.inpWrap}>
                        <img src={lockIcon} alt="" />
                        <input type="password" placeholder="Confirm New Password" />
                    </div>
                    <div style={{ display: "flex" }}>
                        <input className={classes.btn} type="submit" placeholder="Singup" />
                    </div>
                </div>
            </form>
        */}
        <form
          autoComplete="off"
          className={classes.innerWrap}
          onSubmit={handleSubmit(resetPassowrd)}
        >
          <div className={classes.inpWrapChooseNew}>
            <input
              className={classes.inpWrapConfirm}
              type="password"
              placeholder="Enter New Password"
              {...register("password")}
            />
            <input
              className={classes.inpWrapConfirm}
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
            />
          </div>
          {/* <p className={classes.alert2}>{warnMessage}</p> */}
          <input className={classes.btn3} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
