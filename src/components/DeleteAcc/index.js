import classes from "./DeleteAcc.module.css";

const DeleteAcc = () => {
  return (
    <div>
      <div className={classes.textHeading}>
        Once you delete your account, there is no going back. Please be certain.
      </div>
      <div className={classes.btnWrap}>
        <div className={classes.leftBtn}>Deactivate</div>
        <div className={classes.rightBtn}>Delete</div>
      </div>
    </div>
  );
};

export default DeleteAcc;
