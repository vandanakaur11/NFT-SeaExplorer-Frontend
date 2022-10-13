import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "antd";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../context/store";
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
import logoNew1 from "./../../assets/images/logoNew1.png";
import profileIcon from "./../../assets/images/bxs_user-account.svg";
import messageIcon from "./../../assets/images/jam_messages-f.svg";
import logoutImg from "./../../assets/images/logoutImg.png";
import MainDashboard from "../MainDashboard";
import GenerateNFT from "../GenerateNFT";
import Collection from "./../Collections";
import EachCollection from "./../EachCollection";
import SideOption from "./../SideOption";
import SideDrawer from "./../SideDrawer";
import ProfileDropDown from "./../ProfileDropDown";
import Messages from "./../Messages";
import PaymentPlans from "./../PaymentPlans";
import Profile from "./../Profile";
import UserRequest from "./../UserRequest";
import Setting from "./../Setting";
import Referrals from "./../Referrals";
import classes from "./Dashboard.module.css";
import api from "../../services/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { appState, applyAction } = useContext(AppContext);

  const [showPage, setShowPage] = useState("front");
  const [userData, setUserData] = useState(state);

  const choosePath = async () => {
    // if (appState.auth.token) {
    //     const {
    //         data: { Error, message },
    //         data,
    //     } = await axios.post("http://localhost:3030/api/v1/user/auth/check", { token: appState.auth?.token });
    //     if (Error) {
    //         localStorage.clear();
    //         navigate("/");
    //     }
    // }
  };

  const logout = () => {
    localStorage.clear();
    // window.open("http://localhost:3030/api/v1/auth/logout", "_self");
    navigate("/");
  };

  const setData = (collectionId) => {
    localStorage.setItem("collection_id", collectionId);
    setShowPage("eachcollection");
  };

  const getUser = async () => {
    try {
      const userId = localStorage.getItem("user");
      console.log("getUser userId >>>>>>>>>", userId);
      const res = await api.get(`/v1/users/${userId}`);

      console.log("getUser res >>>>>>>>>", res);
      console.log("getUser res.data >>>>>>>>>", res.data);
      console.log("getUser res.data.status >>>>>>>>>", res.data.status);
      console.log("getUser res.data.data >>>>>>>>>", res.data.data);
      console.log("getUser res.data.data.user >>>>>>>>>", res.data.data.user);

      if (res.data.status === "success") {
        setUserData(res.data.data.user);
        console.log("getUser userData >>>>>>", userData);
      }
    } catch (error) {
      console.error("getUser error >>>>>>>>>>>", error);
    }
  };

  useEffect(() => {
    // if (appState.auth?.token) {
    //     const {
    //         data: { Error, message },
    //         data,
    //     } = await axios.post("http://localhost:3030/api/v1/user/auth/check", { token: appState.auth?.token });
    //     if (Error) {
    //         localStorage.clear();
    //         history("/");
    //     } else {
    //         const {
    //             data: { message },
    //         } = await axios.post("http://localhost:3030/api/v1/user/user-info", { token: appState.auth?.token });
    //         const user = JSON.stringify(message);
    //         localStorage.setItem("user", user);
    //     }
    // } else {
    //     history("/");
    // }

    getUser();
  }, []);

  return (
    <div>
      <Row>
        <Col md={4} className={classes.forSidebarShow}>
          <div className={classes.sidebar}>
            <div className={classes.logo}>
              <img src={logoNew1} alt="" onClick={() => choosePath()} />
            </div>
            <div className={classes.sideCont}>
              {/* <div className={classes.sideHeading}>
                                <div>Payments</div>
                                <img alt="" src={uparr} />
                            </div> */}

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={twinarr}
                imageAlt=""
                text="Dashboard"
                val="front"
                path="/dashboard"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={twinarr}
                imageAlt=""
                text="Generat nft"
                val="generateNFT"
                path="/dashboard/nft"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={collection}
                imageAlt=""
                text="My Collection"
                val="collection"
                path="/dashboard/collections"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={profileIcon}
                imageAlt=""
                text="Profile"
                val="profile"
                path="/dashboard/profile"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={messageIcon}
                imageAlt=""
                text="Messages"
                val="messages"
                path="/dashboard/messages"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={Paymentplans}
                imageAlt=""
                text="Payment plans"
                val="payment plans"
                path="/dashboard/payment-plans"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={referal}
                imageAlt=""
                text="Referrals"
                val="referrals"
                path="/dashboard/referrals"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={Auditlogs}
                imageAlt=""
                text="User Requests"
                val="user-request"
                path="/dashboard/user-requests"
              />

              <SideOption
                classes={classes.sideoption}
                setShowPage={setShowPage}
                imageSource={setting}
                imageAlt=""
                text="Settings"
                val="Account Setting"
                path="/dashboard/settings"
              />

              {/* <SideOption
                                classes={classes.sideoption}
                                setShowPage={setShowPage}
                                imageSource={logoutImg}
                                imageAlt=""
                                text="Logout"
                                val="logout"
                                path="/dashboard/"
                            /> */}

              {/* <div className={classes.sideoption} onClick={() => setShowPage("front")}>
                                <img alt="" src={twinarr} />
                                <div>Dashboard</div>
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("generateNFT")}>
                                <img alt="" src={twinarr} />
                                <div>Generat nft</div>
                            </div>
                            <div className={classes.sideoption} onClick={() => setShowPage("collection")}>
                                <img alt="" src={collection} />
                                <div>My Collection</div>
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("profile")}>
                                <img alt="" src={profileIcon} />
                                <div>Profile</div>
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("messages")}>
                                <img alt="" src={messageIcon} />
                                <div>Messages</div>
                            </div> */}
              {/* <div className={classes.sideoption}>
                                <img alt="" src={twinarr} />
                                <div>Payment Plans</div>
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("payment plans")}>
                                <img alt="" src={Paymentplans} />
                                <div>Payment plans</div>
                            </div> */}
              {/* <div className={classes.sideHeading2}>
                                <div>Commerce</div>
                                <img alt="" src={bottomarr} />
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("referrals")}>
                                <img alt="" src={referal} />
                                <div>Referrals</div>
                            </div> */}
              {/* <div className={classes.sideoption}>
                                <img alt="" src={Auditlogs} />
                                <div>Audit logs</div>
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("user-request")}>
                                <img alt="" src={twinarr} />
                                <div>User Requests</div>
                            </div> */}
              {/* <div className={classes.sideoption} onClick={() => setShowPage("Account Setting")}>
                                <img alt="" src={setting} />
                                <div>Settings</div>
                            </div> */}
              <div className={classes.sideoption}>
                <img alt="" src={logoutImg} />
                <div onClick={logout}>Logout</div>
              </div>
            </div>
          </div>
        </Col>
        <Col md={20} className={classes.isTabletNot}>
          <div className={classes.header}>
            <div className={classes.search}>
              <img alt="" src={search} />
              <input type="text" placeholder="Search" />
            </div>
            <div className={classes.userWrap}>
              <img alt="" src={bell} className={classes.bellIcon} />
              <div className={classes.userInfo}>
                <img
                  alt={`${userData.name.first} Pic`}
                  src={userData.avatar}
                  style={{ width: "5vh", marginLeft: "1vw" }}
                />
                <div>
                  <div>
                    {userData
                      ? `${userData.name.first} ${userData.name.last}`
                      : "Anddy’s Makeover"}
                  </div>
                  <div className={classes.userInfoId}>
                    ID: {userData ? userData._id : 12345678910111213141516}
                  </div>
                </div>
                {/* <ProfileDropDown setShowPage={setShowPage} /> */}
              </div>
            </div>
          </div>
          <div className={classes.pageContent}>
            {showPage === "front" && <MainDashboard />}
            {showPage === "generateNFT" && <GenerateNFT showPage={showPage} />}
            {showPage === "collection" && <Collection setData={setData} />}
            {showPage === "eachcollection" && <EachCollection />}
            {showPage === "messages" && <Messages />}
            {showPage === "payment plans" && <PaymentPlans />}
            {showPage === "profile" && <Profile />}
            {showPage === "Account Setting" && <Setting />}
            {showPage === "referrals" && <Referrals />}
            {showPage === "user-request" && <UserRequest />}
          </div>
        </Col>
        <Col md={24} className={classes.isTablet}>
          <div className={classes.header}>
            <div>
              <SideDrawer chooseData={"dash"} setShowPage={setShowPage} />
            </div>
            <div className={classes.search}>
              <img alt="" src={search} />
              <input type="text" placeholder="Search" />
            </div>
            <div className={classes.userWrap}>
              <img alt="" src={bell} className={classes.bellIcon} />
              <div className={classes.userInfo}>
                <img
                  alt={`${userData.name.first} Pic`}
                  src={userData.avatar}
                  style={{ width: "5vh", marginLeft: "1vw" }}
                />
                <div>
                  <div>
                    {userData
                      ? `${userData.name.first} ${userData.name.last}`
                      : "Anddy’s Makeover"}
                  </div>
                  <div className={classes.userInfoId}>
                    ID: {userData ? userData._id : 12345678910111213141516}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.pageContent}>
            {showPage === "front" && <MainDashboard />}
            {showPage === "generateNFT" && <GenerateNFT />}
            {showPage === "collection" && (
              <Collection setShowPage={setShowPage} />
            )}
            {showPage === "eachcollection" && <EachCollection />}
            {showPage === "messages" && <Messages />}
            {showPage === "payment plans" && <PaymentPlans />}
            {showPage === "profile" && <Profile />}
            {showPage === "Account Setting" && <Setting />}
            {showPage === "referrals" && <Referrals />}
            {showPage === "user-request" && <UserRequest />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
