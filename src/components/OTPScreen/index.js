import React, { useState } from "react";
import classes from "./OTPScreen.module.css";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import OTPComp from "../OTP";
import api from "../../services/api";
import logoNew1 from "../../assets/images/logoNew1.png";
function OTPScreen() {
    const history = useNavigate();
    const userId = sessionStorage.getItem("user");

    const [otpCode, setOtpCode] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const choosePath = (path) => {
        if (path === "chooseNewPass") {
            history("/auth/chooseNewPass");
        }
    };

    const verifyOtp = async () => {
        console.log(otpCode);
        console.log(userId);
        try {
            const body = { code: otpCode * 1 };
            const res = await api.patch(`/v1/users/verify-otp-code/${userId}`, body);

            console.log("res >>>>>>>", res);

            if (res.data.status === "success") {
                history("/auth/chooseNewPass");
            }
        } catch (error) {
            console.error("verifyOtp error >>>>>>", error);
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
                <h1>Enter OTP</h1>
                <div className={classes.inpWrapOtp}>
                    <OTPComp setOtpCode={setOtpCode} />
                    {/* <p className={classes.alert2}>{warnMessage}</p> */}
                </div>
                <div className={classes.btn} onClick={() => verifyOtp("chooseNewPass")}>
                    Submit
                </div>
            </div>
        </div>
    );
}

export default OTPScreen;
