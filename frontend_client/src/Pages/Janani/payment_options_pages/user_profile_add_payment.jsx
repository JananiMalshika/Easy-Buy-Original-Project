import React, { useEffect, useState } from "react";
import NavBar from "../../../Components/Thivanka/nav_bar";
import HomeHeader from "../../../Components/Thivanka/home_header";
import Footter from "../../../Components/Thivanka/footter";
import "../../../Css/Janani/user_profile_home.css";
import Image from "../../../Assets/addpayment.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function UserProfileAddPayment() {
  const nav = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expireDate, setexpireDate] = useState("");
  const [cardType, setCardType] = useState("MasterCard");
  const userName = localStorage.getItem("userName");

  const navigate = useNavigate();

  const addHandler = () => {
    if (cardName == "") {
      alert("Please provide the card name");
      return;
    } else if (cardNumber == "") {
      alert("Please provide the card number");
      return;
    } else if (cvv == "") {
      alert("Please provide the CVV number");
      return;
    } else if (expireDate == "") {
      alert("Please selecet the expire date");
      return;
    } else if (cardNumber.length != 16) {
      alert("Card number is not valid  (should be 16 digit)");
      return;
    } else if (cvv.length <= 3 && cvv.length > 10) {
      alert(`Card CVV number is not valid`);
      return;
    }

    const data = {
      cardNumber,
      cardName,
      cvv,
      expireDate,
      email,
      cardType,
    };
    axios
      .post(`http://localhost:8000/user/payment-options/add`, data)
      .then((res) => {
        if (res.data.status === true) {
          alert("Payment Details Added !!");
          navigate("/profile/payment");
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
                style={{
                  marginTop: "8px",

                  cursor: "pointer",
                }}
                onClick={() => navigate("/profile/nav")}
              >
                My Account
              </h4>
              <div className="profile-home-nav-bar">
                <p
                  style={{ marginBottom: "30px", cursor: "pointer" }}
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
                  style={{
                    marginBottom: "30px",
                    cursor: "pointer",
                    color: "#CC8B86",
                  }}
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
                <h4 style={{ marginBottom: "10px" }}>Add Payment Details</h4>
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "20px",
                  }}
                >
                  Card Type
                </label>
                <br />
                <select
                  className="profile-input-fields"
                  style={{ width: "78%" }}
                  onChange={(e) => {
                    setCardType(e.target.value);
                  }}
                >
                  <option value="MasterCard">MasterCard</option>
                  <option value="VISA">VISA</option>
                  <option value="AMEX">AMEX</option>
                </select>
                <br />
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginTop: "20px",
                  }}
                >
                  Name on Card
                </label>
                <br />
                <input
                  type="text"
                  className="profile-input-fields"
                  onChange={(e) => {
                    setCardName(e.target.value);
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
                  Card Number
                </label>
                <br />
                <input
                  type="text"
                  className="profile-input-fields"
                  onChange={(e) => {
                    setCardNumber(e.target.value);
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
                  CVV
                </label>
                <br />
                <input
                  type="number"
                  className="profile-input-fields"
                  onChange={(e) => {
                    setCvv(e.target.value);
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
                  Expire Date
                </label>
                <br />
                <input
                  type="date"
                  className="profile-input-fields"
                  onChange={(e) => {
                    setexpireDate(e.target.value);
                  }}
                />
                <br />
                <div
                  style={{ display: "flex", gap: "10px", marginTop: "25px" }}
                >
                  <button className="profile-btn" onClick={addHandler}>
                    ADD PAYMENT
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

export default UserProfileAddPayment;
