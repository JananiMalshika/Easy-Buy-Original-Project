import React, { useEffect, useState } from "react";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/user_profile_home.css";
import Image from "../../Assets/Reset.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserProfileChangePassword() {
  const nav = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();

  const updateHandler = () => {
    if (password != confirmPassword) {
      alert("Passwords do not match !!");
      return;
    }

    const data = { password };
    axios
      .put(`http://localhost:8000/user/password/change/${email}`, data)
      .then((res) => {
        if (res.data.status === true) {
          alert("Password changed !!");
          navigate("/profile");
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <div className="profile-home-container">
            <div className="profile-home-container-left-wrapper">
              <h4
                style={{ marginTop: "8px", cursor: "pointer" }}
                onClick={() => navigate("/profile/nav")}
              >
                My Account
              </h4>
              <div className="profile-home-nav-bar">
                <p
                  style={{
                    marginBottom: "30px",
                    color: "#CC8B86",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/profile/address-book")}
                >
                  Address Book
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/profile/payment")}
                >
                  Payment
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/order")}
                >
                  Orders
                </p>
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
                  onClick={() => navigate("/review")}
                >
                  Reviews
                </p>
              </div>
            </div>
            <div className="profile-home-container-right-wrapper">
              <div className="input-wrapper">
                <h4 style={{ marginBottom: "10px" }}>Change Password</h4>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "20px",
                  }}
                >
                  New Password
                </label>
                <br />
                <input
                  type="password"
                  className="profile-input-fields"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <br />
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "20px",
                  }}
                >
                  Retype Password
                </label>
                <br />
                <input
                  type="password"
                  className="profile-input-fields"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                <br />

                <br />
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "25px" }}
                >
                  <button className="profile-btn" onClick={updateHandler}>
                    CHANGE PASSWORD
                  </button>
                </div>
              </div>
              <div className="image-wrapper">
                <img
                  src={Image}
                  width="320px"
                  style={{ marginTop: "50px" }}
                  alt="Profile"
                />
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

export default UserProfileChangePassword;
