import { useState } from "react";
import { useForm } from "react-hook-form";
import discordColor from "./../../assets/images/discordColor.png";
import googleColor from "./../../assets/images/googleColor.png";
import twitterColor from "./../../assets/images/twitterColor.png";
import mainIcon from "./../../assets/images/mainIcon.png";
import lockIcon from "./../../assets/images/lockIcon.png";
import userIcon from "./../../assets/images/userIcon.png";
import classes from "./Forgot.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import logoNew1 from "../../assets/images/logoNew1.png";

function Forgot() {
    const history = useNavigate();
    const [userId, setUserId] = useState();
    const [forgotSuccessMessage, setForgotSuccessMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const choosePath = (path) => {
        if (path === "otp") {
            history("/auth/otp");
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
                setUserId(res.data.data.id);

                setForgotSuccessMessage(res.data.message);
                history("/auth/otp");
                // reset();
            }
        } catch (error) {
            console.error("requestOtp error >>>>>>>>>", error);
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
                <h1>Reset Password</h1>
                <form autoComplete="off" className={classes.innerWrap} onSubmit={handleSubmit(requestOtp)}>
                    <div className={classes.innerWrap}>
                        <div className={classes.inpWrap}>
                            <img src={mainIcon} alt="" />
                            <input
                                type="email"
                                placeholder="Choose Email"
                                {...register("email", {
                                    pattern: "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/",
                                    required: true,
                                })}
                            />
                        </div>
                        <div style={{ display: "flex" }}>
                            <input className={classes.btn} type="submit" placeholder="Singup" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Forgot;
