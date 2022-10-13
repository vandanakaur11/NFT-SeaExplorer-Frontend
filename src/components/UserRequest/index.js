import { useEffect, useState } from "react";
import { Modal } from "antd";
// import wavingHand from "./../../assets/images/waving-hand.png";
import leftpurpleArrow from "./../../assets/images/leftpurpleArrow.png";
import rightpurpleArrow from "./../../assets/images/rightpurpleArrow.png";
import classes from "./UserRequest.module.css";
import api from "./../../services/api";
import axios from "axios";

var DATA = [
    { name: "Bruno Alvarez", email: "AnddyMakeover@gmail.com", id: "1" },
    { name: "Bruno Alvarez", email: "AnddyMakeover@gmail.com", id: "2" },
    { name: "Bruno Alvarez", email: "AnddyMakeover@gmail.com", id: "3" },
    { name: "Bruno Alvarez", email: "AnddyMakeover@gmail.com", id: "4" },
    { name: "Bruno Alvarez", email: "AnddyMakeover@gmail.com", id: "5" },
];

const UserRequests = () => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [updateUserStatus, setUpdateUserStatus] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [adminReason, setAdminReason] = useState("");
    const [userIdForReject, setUserIdForReject] = useState("");

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getUsers = async () => {
        try {
            const res = await api.get("/v1/users");

            console.log("getUser res >>>>>>>>>", res);
            console.log("getUser res.data >>>>>>>>>", res.data);
            console.log("getUser res.data.status >>>>>>>>>", res.data.status);
            console.log("getUser res.data.data >>>>>>>>>", res.data.data);
            console.log("getUser res.data.data.users >>>>>>>>>", res.data.data.users);

            if (res.data.status === "success") {
                const pendingUsers = res.data.data.users.filter((item) => item.accountAccepted.status === "pending");
                setPendingUsers(pendingUsers);
                console.log("getUser pendingUsers >>>>>>", pendingUsers);
            }
        } catch (error) {
            console.error("getUsers error >>>>>>>>>>>", error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const rejectUser = async (userId) => {
        console.log("userId >>>>>>", userId);
        setUserIdForReject(userId);
        showModal();
    };

    const approveUser = async (userId) => {
        try {
            const body = {
                accountAccepted: {
                    status: "approved",
                    reason: "OK",
                },
            };
            const res = await api.patch(`/v1/users/update-account-status/${userId}`, body);

            console.log("res >>>>>", res.data.user.accountAccepted.status);

            setUpdateUserStatus(!updateUserStatus);

            // if (res) {
            //   getUsers();
            // }
        } catch (error) {
            console.error("approveUser error >>>>>>>>>>>", error?.response?.message?.message);
        }
    };

    const handleRejectUser = async () => {
        // const getPendingUserId = pendingUsers.map((data) => userId);
        const body = {
            accountAccepted: {
                status: "rejected",
                reason: adminReason,
            },
        };
        console.log("payload for rejecting", body);
        try {
            let res = await api.patch(`/v1/users/update-account-status/${userIdForReject}`, body);
            console.log("rejecting request", res);
            if (res) {
                setIsModalVisible(false);
            }
        } catch (err) {
            console.error("error when rejecting", err);
        }
    };

    return (
        <div className={classes.main}>
            <div className={classes.heading}>Admin Dashboard</div>
            {/* <div className={classes.wrapTextInner}>
            <img src={wavingHand} alt="" />
            <div>Hey Anddy!</div>
        </div> */}
            <div className={classes.subHeading}>New User Requests</div>
            <div className={classes.userListWrap}>
                {pendingUsers.length > 0 ? (
                    pendingUsers.map((data, index) => (
                        <div className={classes.userList} key={index}>
                            <div className={classes.leftWrap}>
                                <div className={classes.leftWrapName}>{`${data?.name?.first} ${data?.name?.last}`}</div>
                                <div className={classes.leftWrapEmail}>{`( ${data?.email} )`}</div>
                            </div>
                            <div className={classes.rightWrap}>
                                <div className={classes.rightWrapLeft} onClick={() => rejectUser(data?._id)}>
                                    Reject
                                </div>
                                <div className={classes.rightWrapRight} onClick={() => approveUser(data?._id)}>
                                    Approve
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 style={{ textAlign: "center" }}>Pending user requests not found</h2>
                )}
            </div>
            {pendingUsers.length > 0 ? (
                <div className={classes.pagination}>
                    <img src={leftpurpleArrow} alt="" />
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <img src={rightpurpleArrow} alt="" />
                </div>
            ) : null}

            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className={classes.adminModal}>
                    <textarea placeholder="Reason for rejecting request !!" onChange={(e) => setAdminReason(e.target.value)}></textarea>
                    <div onClick={() => handleRejectUser()}>Submit</div>
                </div>
            </Modal>
        </div>
    );
};

export default UserRequests;
