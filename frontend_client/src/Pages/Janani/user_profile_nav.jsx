import React from "react";
import "../../Css/Janani/user_profile_home.css";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/user_profile_nav.css";
import { useNavigate } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReviewsIcon from "@mui/icons-material/Reviews";
function UserProfileNav() {
  const navigation = useNavigate();
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
              <p>
                <h4
                  style={{
                    marginTop: "8px",
                    color: "#CC8B86",
                    cursor: "pointer",
                  }}
                  onClick={() => navigation("/profile/nav")}
                >
                  My Account
                </h4>
              </p>
              <div className="profile-nav-home-nav-bar">
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigation("/profile")}
                >
                  My Profile
                </p>

                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigation("/profile/address-book")}
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
                  onClick={() => navigation("/order")}
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
            <div className="profile-nav-home-container-right-wrapper">
              <br />
              <h4>Manage My Account</h4>
              <div className="item-box-wrapper">
                <div
                  className="item-box"
                  onClick={() => navigation("/profile")}
                  style={{ paddingTop: "30px", cursor: "pointer" }}
                >
                  <p>
                    {" "}
                    <PersonIcon fontSize="large" />
                  </p>
                  <span style={{ fontWeight: "bold" }}> My Profile</span>
                </div>
                <div
                  className="item-box"
                  onClick={() => navigation("/profile/address-book")}
                  style={{ paddingTop: "30px", cursor: "pointer" }}
                >
                  <p>
                    {" "}
                    <ContactMailIcon fontSize="large" />
                  </p>
                  <span style={{ fontWeight: "bold" }}>Address Book</span>
                </div>
                <div
                  className="item-box"
                  onClick={() => navigation("/profile/payment")}
                  style={{ paddingTop: "30px", cursor: "pointer" }}
                >
                  <p>
                    {" "}
                    <PaymentIcon fontSize="large" />
                  </p>
                  <span style={{ fontWeight: "bold" }}> Payments</span>
                </div>
              </div>
              <div className="item-box-wrapper2">
                <div
                  className="item-box2"
                  onClick={() => navigation("/order")}
                  style={{ paddingTop: "30px", cursor: "pointer" }}
                >
                  <p>
                    {" "}
                    <LocalShippingIcon fontSize="large" />
                  </p>
                  <span style={{ fontWeight: "bold" }}> Orders</span>
                </div>
                <div
                  className="item-box2"
                  onClick={() => navigation("/review")}
                  style={{ paddingTop: "30px", cursor: "pointer" }}
                >
                  <p>
                    {" "}
                    <ReviewsIcon fontSize="large" />
                  </p>
                  <span style={{ fontWeight: "bold" }}> Reviews</span>
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

export default UserProfileNav;
