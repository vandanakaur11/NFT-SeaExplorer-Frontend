import React, { useState } from "react";
import { Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SeaExplorerLogoDark from "./../../assets/images/SeaExplorerLogoDark.png";
import Auditlogs from "./../../assets/images/Auditlogs.png";
import bottomarr from "./../../assets/images/bottomarr.png";
import uparr from "./../../assets/images/uparr.png";
import collection from "./../../assets/images/collection.png";
import doubletick from "./../../assets/images/doubletick.png";
import handshake from "./../../assets/images/handshake.png";
import referal from "./../../assets/images/referal.png";
import setting from "./../../assets/images/setting.png";
import twinarr from "./../../assets/images/twinarr.png";
import Paymentplans from "./../../assets/images/Paymentplans.png";
import bell from "./../../assets/images/bell.png";
import search from "./../../assets/images/search.png";
import idPic from "./../../assets/images/idPic.png";
import profileIcon from "./../../assets/images/bxs_user-account.svg";
import messageIcon from "./../../assets/images/jam_messages-f.svg";
import logoutImg from "./../../assets/images/logoutImg.png";
import MainDashboard from "./../MainDashboard";
import GenerateNFT from "./../GenerateNFT";
import Collection from "./../Collections";
import EachCollection from "./../EachCollection";
import SideOption from "./../SideOption";
import Referrals from "./../Referrals";
import "antd/dist/antd.css";
import classes from "./SideDrawer.module.css";

const SideDrawer = ({ chooseData, setShowPage }) => {
    const history = useNavigate();
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    const choosePath = (path) => {
        if (path === "login") {
            history("/auth/login");
        }

        if (path === "signup") {
            history("/auth/signup");
        }
    };
    const logout = () => {
        history("/");
    };
    return (
        <>
            <MenuOutlined onClick={showDrawer} className={classes.menuIcon} />

            {chooseData !== "dash" && (
                <Drawer title="Basic Drawer" placement="right" onClose={onClose} visible={visible} getContainer={false}>
                    <div className={classes.optionWrap}>
                        <div>Home</div>
                        <div>About</div>
                        <div>Pricing</div>
                        <div>Features</div>
                        <div>Our clients</div>
                    </div>
                    <div className={classes.btnWrap}>
                        <div onClick={() => choosePath("login")}>Login</div>
                        <div onClick={() => choosePath("signup")}>Sign up</div>
                        {/* <div>SeaUpload</div> */}
                    </div>
                    <div className={classes.seaBtn}>Sea Upload</div>
                </Drawer>
            )}

            {chooseData === "dash" && (
                <Drawer title="Basic Drawer" placement="left" onClose={onClose} visible={visible} getContainer={false}>
                    <div className={classes.optionGenNft}>
                        {/* <div className={classes.sideHeading}>
                <div>Payments</div>
                <img alt="" src={uparr} />
            </div> */}

                        <div className={classes.sideoption} onClick={() => setShowPage("front")}>
                            <img alt="" src={twinarr} />
                            <div>Dashboard</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("generateNFT")}>
                            <img alt="" src={twinarr} />
                            <div>Generat nft</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("collection")}>
                            <img alt="" src={collection} />
                            <div>My Collection</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("profile")}>
                            <img alt="" src={profileIcon} />
                            <div>Profile</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("messages")}>
                            <img alt="" src={messageIcon} />
                            <div>Messages</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("payment plans")}>
                            <img alt="" src={Paymentplans} />
                            <div>Payment plans</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("referrals")}>
                            <img alt="" src={referal} />
                            <div>Referrals</div>
                        </div>
                        {/* <div className={classes.sideHeading2}>
                <div>Payments</div>
                <img alt="" src={bottomarr} />
            </div> */}
                        <div className={classes.sideoption} onClick={() => setShowPage("user-request")}>
                            <img alt="" src={twinarr} />
                            <div>User Requests</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => setShowPage("Account Setting")}>
                            <img alt="" src={setting} />
                            <div>Settings</div>
                        </div>
                        <div className={classes.sideoption} onClick={() => logout()}>
                            <img alt="" src={logoutImg} />
                            <div>Logout</div>
                        </div>
                        {/* <div className={classes.sideoption}>
                  <img alt="" src={setting} />
                  <div>Settings</div>
              </div>
              <div className={classes.sideoption}>
                  <img alt="" src={setting} />
                  <div>Logout</div>
              </div> */}
                    </div>
                </Drawer>
            )}
        </>
    );
};

export default SideDrawer;
