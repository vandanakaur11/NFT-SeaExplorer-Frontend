import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import GenerateNFT from "./components/GenerateNFT";
import Collections from "./components/Collections";
import Profile from "./components/Profile";
import Messages from "./components/Messages";
import PaymentPlans from "./components/PaymentPlans";
import Referrals from "./components/Referrals";
import UserRequest from "./components/UserRequest";
import Setting from "./components/Setting";
import ForgotComp from "./components/Forgot";
import Login from "./components/Login";
import Success from "./components/Success";
import Signup from "./components/Signup";
import Verify from "./components/Verify";
import OTPScreen from "./components/OTPScreen";
import ResetPassword from "./components/ResetPassword";

const AppRouting = () => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   user && JSON.parse(user) ? setUser(true) : setUser(false);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("user", user);
  // }, [user]);

  return (
    <Router>
      <Routes>
        {/* {user ? ( */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="nft" element={<GenerateNFT />} />
          <Route path="collections" element={<Collections />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messages" element={<Messages />} />
          <Route path="payment-plans" element={<PaymentPlans />} />
          <Route path="referrals" element={<Referrals />} />
          <Route path="user-requests" element={<UserRequest />} />
          <Route path="settings" element={<Setting />} />
        </Route>
        {/* ) : (
          <> */}
        <Route exact path="/" element={<Home />} />
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot" element={<ForgotComp />} />
          <Route path="otp" element={<OTPScreen />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
        <Route path="/success" element={<Success />} />
        <Route path="/verify/:id/:token" element={<Verify />} />
        {/* </> */}
        {/* )} */}

        {/* <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouting;
