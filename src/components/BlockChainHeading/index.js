import polygonheader2 from "./../../assets/images/polygon-header2.png";
import classes from "./BlockChainHeading.module.css";

const BlockChainHeading = () => {
  return (
    <div>
      <div className={classes.mainWrap}>
        <img src={polygonheader2} alt="" />
        <h2>BLOCKCHAIN</h2>
        <h3>
          Customize and deploy a smart contract to <span>Ethereum</span> and{" "}
          <span> other blockchains</span>
        </h3>
        <h4>
          Sell your NFT collection using our customizable mint page or use our
          SDK to mint from you website.
        </h4>
      </div>
    </div>
  );
};

export default BlockChainHeading;
