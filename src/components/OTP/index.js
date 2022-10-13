import { useState } from "react";
import OtpInput from "react-otp-input";
import classes from "./OTP.module.css";

const OTP = ({ setForOtp, setOtpCode }) => {
    const [otp, setOtp] = useState("");

    const handleChange = (otp) => {
        setOtp(otp);
        setOtpCode(otp);

        console.log("otp >>>>>>>>>", otp);
    };

    return (
        <div style={{ width: "auto" }} className={classes.otpDesign}>
            <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={
                    <span>
                        <strong></strong>
                    </span>
                }
                inputStyle={{
                    width: "100%",
                    // height: "3rem",
                    height: "50px",
                    margin: "12px",
                    fontSize: "2rem",
                    borderRadius: 60,
                    border: "3px solid var(--purpleShadeOne)",
                }}
            />
        </div>
    );
};

export default OTP;
