import React, { useEffect, useState } from "react";
import "../../Css/Janani/user_profile_home.css";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/user_profile_nav.css";
import { useNavigate } from "react-router";
import axios from "axios";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SendToMobileOutlinedIcon from "@mui/icons-material/SendToMobileOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
function UserProfileAddressBook() {
  const navigation = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [shippingData, setShippingData] = useState(["test"]);
  useEffect(() => {
    getShippingDetails();
  }, [email]);

  const getShippingDetails = () => {
    axios
      .get(`http://localhost:8000/user/address/get/${email}`)
      .then((res) => {
        console.log(res);
        setShippingData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    const confirmBox = window.confirm(
      "Are you sure want to delete this address?"
    );
    if (confirmBox === true) {
      axios
        .get(`http://localhost:8000/user/address/remove/${id}`)
        .then((res) => {
          if (res.data) {
            getShippingDetails();
            alert("Deleted !!");
          } else {
            alert("Failed");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="site-main-container">
      <div>
        <NavBar />
      </div>
      <div className="site-body-container">
        <div>
          <HomeHeader />
        </div>
        <div className="site-details-wrapper clearfix">
          {/* body start */}
          <div className="profile-nav-home-container">
            <div className="profile-nav-home-container-left-wrapper">
              <h4
                style={{ marginTop: "8px", cursor: "pointer" }}
                onClick={() => navigation("/profile/nav")}
              >
                My Account
              </h4>
              <div className="profile-nav-home-nav-bar">
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigation("/profile")}
                >
                  My Profile
                </p>
                <p
                  style={{
                    marginBottom: "30px",
                    color: "#CC8B86",
                    cursor: "pointer",
                  }}
                  onClick={() => navigation("/profile")}
                >
                  Address Book
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigation("/profile/payment")}
                >
                  Payment
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigation("/orders")}
                >
                  Orders
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigation("/review")}
                >
                  Reviews
                </p>
              </div>
            </div>
            <div className="profile-home-container-right-wrapper">
              <div className="input-wrapper">
                <h4 style={{ marginBottom: "10px" }}>Shipping Address</h4>
                <button onClick={() => navigation("/profile/address-book/add")}>
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </button>
                <div className="item-box-wrapper-shipping">
                  {shippingData.map((item, index) => (
                    <div
                      className="item-box-shipping"
                      style={{
                        paddingTop: "30px",
                      }}
                    >
                      <p style={{ paddingBottom: "5px" }}>
                        <PersonOutlineOutlinedIcon /> Personal Info:{" "}
                        {item?.personalInfo}
                      </p>
                      <p style={{ paddingBottom: "5px" }}>
                        <SendToMobileOutlinedIcon />
                        Mobile: {item?.mobile}
                      </p>
                      <p style={{ paddingBottom: "5px" }}>
                        <LocationOnOutlinedIcon /> Address: {item?.address}
                      </p>
                      <br />
                      <span
                        style={{
                          color: "orange",
                          fontWeight: "bold",
                          paddingTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigation("/profile/address-book/add", {
                            state: item._id,
                          })
                        }
                      >
                        EDIT
                      </span>{" "}
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                          paddingTop: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => deleteHandler(item._id)}
                      >
                        DELETE
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* body end */}
        </div>
        <Footter />
      </div>
    </div>
  );
}

export default UserProfileAddressBook;
