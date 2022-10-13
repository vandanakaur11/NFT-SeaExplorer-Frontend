import { useState, useEffect, useContext } from "react";
import { Modal, Button } from "antd";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { AppContext } from "./../../context/store";
import discordColor from "./../../assets/images/discordColor.png";
import googleColor from "./../../assets/images/googleColor.png";
import twitterColor from "./../../assets/images/twitterColor.png";
import mainIcon from "./../../assets/images/mainIcon.png";
import lockIcon from "./../../assets/images/lockIcon.png";
import userIcon from "./../../assets/images/userIcon.png";
import OTPComp from "./../OTP";
import classes from "./Modal.module.css";
import api from "../../services/api";

const isValidEmail = (email) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const ModalComp = ({ chooseData, handleModal, setHandleModal }) => {
  // console.log("render");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fname, setFname] = useState("");
  // const [lname, setLname] = useState("");
  const [forgot, setForgot] = useState(false);
  const [Sign, setSign] = useState(false);
  const [GoOtp, setGoOtp] = useState(false);
  const [email, setEmal] = useState("");
  const [warnMessage, setWarnMessage] = useState("");
  const [confirmPass, setConfirmPass] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState("");
  const [userId, setUserId] = useState();

  const { appState, applyAction } = useContext(AppContext);

  const handleEmailValidation = (email) => {
    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    }

    return isValid;
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalLogin = () => {
    setIsModalVisible(true);
    setHandleModal("login");
    setGoOtp(false);
    setConfirmPass(false);
  };

  const showModalSignUp = () => {
    setIsModalVisible(true);
    setHandleModal("signup");
  };

  const showModalSeaUpload = () => {
    // setIsModalVisible(true);
    // setHandleModal("login");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setForgot(false);
  };

  const registerUser = async (data) => {
    try {
      const roleRes = await api.get("/v1/roles");
      console.log("roleRes >>>>>>>>>>", roleRes);

      let role = "";

      for (let key in roleRes.data.data.roles) {
        if (roleRes.data.data.roles[key].name === "user") {
          role = roleRes.data.data.roles[key];
        }
      }

      const body = Object.assign(data, { role: role._id });
      console.log("body >>>>>>>>>>", body);

      const res = await api.post("/v1/users", body);
      console.log("registerUser res >>>>>>>>>>", res);
      console.log("registerUser res.data >>>>>>>>>>", res.data);
      console.log("registerUser res.data.status >>>>>>>>>>", res.data.status);

      // res && setHandleModal("login");

      if (res.data.status === "success") {
        navigate("/success");
      }

      //   if (!confirmation.data.Error) {
      //     reset(undefined);
      //     setIsModalVisible(false);
      //   }
      //   if (confirmation.data.Error) {
      //     setWarnMessage(confirmation.data.message);
      //     setTimeout(() => {
      //       setWarnMessage("");
      //     }, 3000);
      //   }
    } catch (error) {
      console.error("registerUser error >>>>>>>>>", error);
    }
  };

  const loginUser = async (body) => {
    try {
      const res = await api.post("/v1/users/login", body);
      console.log("loginUser res >>>>>>>", res);
      console.log("loginUser res.data >>>>>>>", res.data);
      console.log("loginUser res.data.status >>>>>>>", res.data.status);
      console.log("loginUser res.data.data >>>>>>>", res.data.data);
      console.log("loginUser res.data.data.user >>>>>>>", res.data.data.user);

      if (res.data.status === "success") {
        localStorage.setItem("user", res.data.data.user._id);
        navigate("/dashboard", { state: res.data.data.user });
      }
    } catch (error) {
      console.error("registerUser error >>>>>>>>>", error);
    }
  };

  const requestOtp = async (body) => {
    // const requestForm = {
    //     email: body.email,
    // };
    // console.log(requestForm);
    // try {
    //     const {
    //         data: { Error, message },
    //     } = await axios.post("http://localhost:3030/api/v1/user/request-otp", requestForm);
    //     console.log(message);
    //     if (!Error) {
    //         setEmal(body.email);
    //         setGoOtp(true);
    //         reset(undefined);
    //     } else {
    //         setWarnMessage(message);
    //         setTimeout(() => {
    //             setWarnMessage("");
    //         }, 3000);
    //     }
    // } catch (error) {
    //     console.log(`Error: `, error.message);
    // }

    try {
      delete body.confirmPassword;
      delete body.password;

      const res = await api.post("/v1/users/forgot-password", body);
      console.log("res >>>>>>>", res);

      if (res) {
        setGoOtp(true);
        setUserId(res.data.data.id);
        setForgotSuccessMessage(res.data.message);
        reset();
      }
    } catch (error) {
      console.error("requestOtp error >>>>>>>>>", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const body = { code: otpCode * 1 };
      const res = await api.patch(`/v1/users/verify-otp-code/${userId}`, body);

      console.log("res >>>>>>>", res);

      if (res.data.status === "success") {
        setConfirmPass(true);
      }
    } catch (error) {
      console.error("verifyOtp error >>>>>>", error);
    }
  };

  const resetPassowrd = async (body) => {
    /* let { password, Cpassword } = body;
    if (password && Cpassword && password === Cpassword) {
      const changePass = {
        email: email, 
        newPassword: Cpassword,
      };

      try {
        const {
          data: { message },
        } = await axios.post(
          `http://localhost:3030/api/v1/user/change-password`,
          changePass
        );
        if (message) {
          reset();
          setConfirmPass(false);
          setGoOtp(false);
          setForgot(false);
        }
      } catch (error) {
        console.log(`ErrorL ${error.message}`);
      }
    } else {
      setWarnMessage("Password is not match!");
      setTimeout(() => {
        setWarnMessage("");
      }, 3000);
    } */

    console.log("body >>>>>>>>", body);

    try {
      const res = await api.patch(`/v1/users/update-password/${userId}`, body);
      console.log("res >>>>>>>>>", res);

      if (res.data.status === "success") {
        setConfirmPass(false);
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("resetPassword error >>>>>>", error);
    }
  };

  const google = async () => {
    // window.open("http://localhost:3030/api/v1/auth/google", "_self");
    navigate("/dashboard");
  };

  const discord = () => {
    // window.open("http://localhost:3030/api/v1/auth/discord", "_self");
    navigate("/dashboard");
  };

  return (
    <>
      {chooseData === "login" && <div onClick={showModalLogin}>Login</div>}
      {chooseData === "signin" && <div onClick={showModalSignUp}>Sign up</div>}
      {chooseData === "seaupload" && (
        <div onClick={showModalSeaUpload}>Sea Upload</div>
      )}
      {chooseData === "nftcollect" && (
        <div onClick={showModal}>NFT Generated</div>
      )}

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className={classes.modalWrap}
      >
        {/* <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p> */}
        {handleModal === "login" && !forgot && !GoOtp && (
          <div className={classes.mainWrap}>
            <h1>Login</h1>
            <div>
              <form autoComplete="off" onSubmit={handleSubmit(loginUser)}>
                <div className={classes.innerWrap}>
                  <div className={classes.inpWrap}>
                    <img src={mainIcon} alt="" />

                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      {...register("email", { required: true })}
                    />
                  </div>

                  <div className={classes.inpWrap}>
                    <img src={lockIcon} alt="" />
                    <input
                      type="password"
                      placeholder="Enter Password"
                      {...register("password", { required: true })}
                    />
                  </div>

                  <div
                    className={classes.forgot}
                    onClick={() => setForgot(true)}
                  >
                    Forgot Password ?
                  </div>
                  <p className={classes.alert2}>{warnMessage}</p>
                  <input className={classes.btn} type="submit" />
                </div>
              </form>
            </div>
            <div className={classes.iconWrap}>
              <img src={discordColor} alt="" onClick={discord} />
              <img src={googleColor} alt="" onClick={google} />
              <img src={twitterColor} alt="" />
            </div>

            <div className={classes.already}>
              Dont have an account?{" "}
              <span onClick={() => setHandleModal("signup")}>Sign up</span>
            </div>
          </div>
        )}

        {/* sign up form start */}
        {handleModal === "signup" && !forgot && (
          <div className={classes.mainWrap}>
            <h1>Sign up</h1>
            <div>
              <form autoComplete="off" onSubmit={handleSubmit(registerUser)}>
                <div className={classes.innerWrap}>
                  <div className={classes.inpWrap}>
                    <img src={userIcon} alt="" />
                    <input
                      type="text"
                      placeholder="Enter First Name"
                      {...register("name.first", { required: true })}
                    />
                  </div>

                  <ErrorMessage errors={errors} />
                  <ErrorMessage
                    errors={errors}
                    name="firstname"
                    render={({ message }) => (
                      <p className={classes.alert}>First name is required!</p>
                    )}
                  />

                  <div className={classes.inpWrap}>
                    <img src={userIcon} alt="" />
                    <input
                      type="text"
                      placeholder="Enter Last Name"
                      {...register("name.last", { required: true })}
                    />
                  </div>

                  <ErrorMessage errors={errors} />
                  <ErrorMessage
                    errors={errors}
                    name="lastname"
                    render={({ message }) => (
                      <p className={classes.alert}>Last name is required!</p>
                    )}
                  />

                  <div className={classes.inpWrap}>
                    <img src={mainIcon} alt="" />
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      {...register("email", {
                        validate: handleEmailValidation,
                        required: true,
                      })}
                    />
                  </div>

                  <ErrorMessage errors={errors} />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className={classes.alert}>Last name is required!</p>
                    )}
                  />

                  <div className={classes.inpWrap}>
                    <img src={lockIcon} alt="" />
                    <input
                      type="password"
                      placeholder="Enter Password"
                      {...register("password", {
                        minLength: 6,
                        required: true,
                      })}
                    />
                  </div>

                  <ErrorMessage errors={errors} />
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className={classes.alert}>
                        Password is not reach minimum length!
                      </p>
                    )}
                  />
                  <p className={classes.alert2}>{warnMessage}</p>
                  <input className={classes.btn} type="submit" />
                </div>
              </form>
            </div>
            <div className={classes.iconWrap}>
              <img src={discordColor} alt="" onClick={discord} />
              <img src={googleColor} alt="" onClick={google} />
              <img src={twitterColor} alt="" />
            </div>
          </div>
        )}

        {/* sign up form end */}
        {forgot === true && !GoOtp && (
          <div className={classes.mainWrap}>
            <h1>Reset Password</h1>
            <form
              autoComplete="off"
              className={classes.innerWrap}
              onSubmit={handleSubmit(requestOtp)}
            >
              <div className={classes.inpWrap}>
                <img src={mainIcon} alt="" />
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  {...register("email", {
                    validate: handleEmailValidation,
                    required: true,
                  })}
                />
              </div>
              <ErrorMessage errors={errors} />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <p className={classes.alert}>Invalid Email!</p>
                )}
              />
              <p className={classes.alert2}>{warnMessage}</p>
              <input className={classes.btn} type="submit" />
            </form>
          </div>
        )}
        {GoOtp && forgot && !confirmPass && (
          <div className={classes.mainWrap}>
            <h1 className={classes.otpHeading}>Enter OTP</h1>
            <div className={classes.innerWrap}>
              <div className={classes.inpWrapOtp}>
                <OTPComp setOtpCode={setOtpCode} />
                <p className={classes.alert2}>{warnMessage}</p>
              </div>
              <input
                className={classes.btn2}
                type="submit"
                onClick={() => verifyOtp()}
              />
            </div>
          </div>
        )}
        {confirmPass && forgot && (
          <div className={classes.mainWrap}>
            <h1>Choose New Password</h1>
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
              <p className={classes.alert2}>{warnMessage}</p>
              <input className={classes.btn3} type="submit" />
            </form>
          </div>
        )}
        {chooseData === "nftcollect" && (
          <div>
            <div className={classes.nftGenDiv}>
              <h1>NFT Collection Generated Successfully</h1>
              <div className={classes.nftGenBtn}>Ok</div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalComp;
