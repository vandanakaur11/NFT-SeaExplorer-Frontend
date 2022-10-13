import { useForm } from "react-hook-form";
import discordColor from "./../../assets/images/discordColor.png";
import googleColor from "./../../assets/images/googleColor.png";
import twitterColor from "./../../assets/images/twitterColor.png";
import mainIcon from "./../../assets/images/mainIcon.png";
import lockIcon from "./../../assets/images/lockIcon.png";
import userIcon from "./../../assets/images/userIcon.png";
import classes from "./Signup.module.css";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import logoNew1 from "../../assets/images/logoNew1.png";

const Signup = () => {
    const history = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const choosePath = (path) => {
        if (path === "login") {
            history("/auth/login");
        }
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
                history("/success");
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
    const gotoDashboard = () => {
        history("/");
    };
    return (
        <div className={classes.main}>
            <div onClick={() => gotoDashboard()}>
                <img src={logoNew1} alt="" className={classes.logoImage} />
            </div>
            <div className={classes.mainWrap}>
                <h1>Sign up</h1>
                <div>
                    <form autoComplete="off" onSubmit={handleSubmit(registerUser)}>
                        <div className={classes.innerWrap}>
                            <div className={classes.inpWrap}>
                                <img src={userIcon} alt="" />
                                <input type="text" placeholder="Enter First Name" {...register("firstname", { required: true })} />
                            </div>
                            <div className={classes.inpWrap}>
                                <img src={userIcon} alt="" />
                                <input type="text" placeholder="Enter Last Name" {...register("lastname", { required: true })} />
                            </div>
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
                            <div className={classes.inpWrap}>
                                <img src={lockIcon} alt="" />
                                <input
                                    type="password"
                                    placeholder="Choose Password"
                                    {...register("password", { minLength: 6, required: true })}
                                />
                            </div>
                            <div style={{ display: "flex" }}>
                                <input className={classes.btn} type="submit" placeholder="Singup" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className={classes.iconWrap}>
                    <img src={discordColor} alt="" />
                    <img src={googleColor} alt="" />
                    <img src={twitterColor} alt="" />
                </div>
                <div className={classes.already}>
                    Dont have an account? <span onClick={() => choosePath("login")}>Login</span>
                </div>
            </div>
        </div>
    );
};

export default Signup;
