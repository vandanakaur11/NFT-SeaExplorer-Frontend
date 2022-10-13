import { useState } from "react";
import SeaExplorerLogo from "./../../assets/images/SeaExplorerLogo.png";
import SideDrawer from "./../SideDrawer";
import ModalComp from "./../Modal";
import logoNew2 from "./../../assets/images/logoNew2.png";
import classes from "./Header.module.css";

const Header = () => {
  let loginData = "login";
  let signupData = "signin";
  let seauploadData = "seaupload";

  const [handleModal, setHandleModal] = useState("");

  return (
    <div>
      <div className={classes.mainWrap}>
        <div className={classes.logoWrap}>
          <img src={logoNew2} alt="" />
        </div>
        <div className={classes.optionWrap}>
          <div>Home</div>
          <div>About</div>
          <div>Pricing</div>
          <div>Features</div>
          <div>Our clients</div>
        </div>
        <div className={classes.btnWrap}>
          {/* <div className={classes.btnLogin}> */}
          <ModalComp
            chooseData={loginData}
            handleModal={handleModal}
            setHandleModal={setHandleModal}
          />
          {/* </div> */}
          {/* <div className={classes.btnSign}> */}
          <ModalComp
            chooseData={signupData}
            handleModal={handleModal}
            setHandleModal={setHandleModal}
          />
          {/* </div> */}
          {/* <div className={classes.btnSea}> */}
          <ModalComp chooseData={seauploadData} handleModal={handleModal} />
          {/* </div> */}
        </div>
        <div className={classes.drawer}>
          <SideDrawer />
        </div>
      </div>
    </div>
  );
};

export default Header;
