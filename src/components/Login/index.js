import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import discordColor from "./../../assets/images/discordColor.png";
import googleColor from "./../../assets/images/googleColor.png";
import twitterColor from "./../../assets/images/twitterColor.png";
import mainIcon from "./../../assets/images/mainIcon.png";
import lockIcon from "./../../assets/images/lockIcon.png";
import userIcon from "./../../assets/images/userIcon.png";
import classes from "./Login.module.css";
import api from "../../services/api";
import logoNew1 from "../../assets/images/logoNew1.png";

const Login = () => {
    const history = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const choosePath = (path) => {
        if (path === "forgot") {
            history("/auth/forgot");
        }
        if (path === "dash") {
            history("/dashboard");
        }
        if (path === "signup") {
            history("/auth/signup");
        }
    };

    const loginUser = async (body) => {
        console.log(body);
        try {
            const res = await api.post("/v1/users/login", body);
            console.log("loginUser res >>>>>>>", res);
            console.log("loginUser res.data >>>>>>>", res.data);
            console.log("loginUser res.data.status >>>>>>>", res.data.status);
            console.log("loginUser res.data.data >>>>>>>", res.data.data);
            console.log("loginUser res.data.data.user >>>>>>>", res.data.data.user);

            if (res.data.status === "success") {
                sessionStorage.setItem("user", res.data.data.user._id);
                history("/dashboard", { state: res.data.data.user });
            }
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
                <h1>Login</h1>
                <div>
                    <form autoComplete="off" onSubmit={handleSubmit(loginUser)}>
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
                            <div className={classes.inpWrap}>
                                <img src={lockIcon} alt="" />
                                <input
                                    type="password"
                                    placeholder="Choose Password"
                                    {...register("password", { minLength: 6, required: true })}
                                />
                            </div>
                            <div className={classes.forgot} onClick={() => choosePath("forgot")}>
                                Forgot Password ?
                            </div>
                            <input className={classes.btn} type="submit" placeholder="Singup" />
                        </div>
                    </form>
                </div>
                <div className={classes.iconWrap}>
                    <img src={discordColor} alt="" />
                    <img src={googleColor} alt="" />
                    <img src={twitterColor} alt="" />
                </div>

                <div className={classes.already}>
                    Dont have an account? <span onClick={() => choosePath("signup")}>Sign up</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
