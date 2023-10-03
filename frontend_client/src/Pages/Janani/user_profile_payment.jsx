import React, { useEffect, useState } from "react";
import "../../Css/Janani/user_profile_home.css";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/user_profile_nav.css";
import { useNavigate } from "react-router";
import axios from "axios";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
function UserProfilePaymentOptions() {
  const navigation = useNavigate();
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [paymentOptions, setPaymentOptions] = useState([]);
  useEffect(() => {
    getPaymentOptions();
  }, [email]);

  const getPaymentOptions = () => {
    axios
      .get(`http://localhost:8000/user/payment-options/get/${email}`)
      .then((res) => {
        console.log(res);
        setPaymentOptions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = (id) => {
    const confirmBox = window.confirm(
      "Are you sure want to delete this payment option?"
    );
    if (confirmBox === true) {
      axios
        .get(`http://localhost:8000/user/payment-options/remove/${id}`)
        .then((res) => {
          if (res.data) {
            getPaymentOptions();
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
              <p>
                <h4
                  style={{ marginTop: "8px", cursor: "pointer" }}
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
                  style={{
                    marginBottom: "30px",
                    color: "#CC8B86",
                    cursor: "pointer",
                  }}
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
            <div className="profile-home-container-right-wrapper">
              <div className="input-wrapper">
                <h4 style={{ marginBottom: "10px" }}>Payment Options</h4>
                <button onClick={() => navigation("/profile/payment/add")}>
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </button>
                <div className="item-box-wrapper-shipping">
                  {paymentOptions.map((item, index) => (
                    <div>
                      <div class="panel">
                        <div class="card card--front">
                          <div class="card__number">
                            Card No: {item.cardNumber}
                          </div>
                          <div class="card__expiry-date">
                            Exp Date: {item.expireDate}
                          </div>
                          <div class="card__owner">{item.cardName}</div>
                          <img
                            class="card__logo"
                            src={
                              item.cardType == "VISA"
                                ? "data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTAxLTEyVDE5OjAxOjgxPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNj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"
                                : item.cardType == "AMEX"
                                ? "data:image/png;base64,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"
                                : "data:image/png;base64,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"
                            }
                          />
                          <br />
                          <p
                            style={{
                              color: "red",
                              fontWeight: "bold",
                              paddingTop: "10px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteHandler(item._id)}
                          >
                            DELETE
                          </p>
                        </div>
                      </div>
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

export default UserProfilePaymentOptions;
