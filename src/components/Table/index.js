import avatarProfile from "./../../assets/images/avatarProfile.png";
import classes from "./Table.module.css";

const tableData = [
  {
    no: "1",
    name: "John",
    img: avatarProfile,
    email: "John@xyz.com",
    status: "Pending",
  },
  {
    no: "2",
    name: "John",
    img: avatarProfile,
    email: "John@xyz.com",
    status: "Active",
  },
  {
    no: "3",
    name: "John",
    img: avatarProfile,
    email: "John@xyz.com",
    status: "Not Active",
  },
];

const Table = () => {
  return (
    <div>
      <div className={classes.main}>
        <div className={classes.heading}>Referral User</div>
        <div className={classes.tableFlow}>
          <div className={classes.headingBottom}>
            <div>#</div>
            <div>Name</div>
            <div>Avatar</div>
            <div>Email</div>
            <div>Status</div>
          </div>
          <div>
            {tableData.map((data, i) => (
              <div key={i} className={classes.tableStyle}>
                <div>{data.no}</div>
                <div>{data.name}</div>
                <div>
                  <img src={data.img} alt="" />
                </div>
                <div>{data.email}</div>
                {data.status === "Pending" && (
                  <div className={classes.statusBtnPending}>{data.status}</div>
                )}
                {data.status === "Active" && (
                  <div className={classes.statusBtnActive}>{data.status}</div>
                )}
                {data.status === "Not Active" && (
                  <div className={classes.statusBtnNotActive}>
                    {data.status}
                  </div>
                )}
              </div>
            ))}
            <div className={classes.viewAll}>View All</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
