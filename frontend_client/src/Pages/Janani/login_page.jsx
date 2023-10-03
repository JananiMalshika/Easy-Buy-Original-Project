import React, { useState } from "react";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/login.css";
import LoginImage from "../../Assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [emai, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = () => {
    if (emai.trim().length === 0) {
      alert("All the fields required!");
    } else if (password.trim().length === 0) {
      alert("All the fields required!");
    } else {
      axios
        .get(`http://localhost:8000/user/login/${emai}/${password}`)
        .then((res) => {
          if (res.data !== null) {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("con", res.data.country);
            localStorage.setItem("mobile", res.data.mobile);
            localStorage.setItem("bdate", res.data.bdate);
            localStorage.setItem("id", res.data._id);
            navigate("/home");
            console.log(res.data);
          } else {
            alert("Invalid Credentials!");
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
          <div className="login-container">
            <div className="login-container-left-wrapper">
              <h3>Welcome!!!</h3>
              <h3>Login to Your Account!!!</h3>
              <br />

              <input
                type="email"
                placeholder="Please Enter Your Emaill..."
                className="input-fields"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <input
                type="password"
                placeholder="Please Enter Your Password..."
                className="input-fields"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <br />
              <br />
              <button className="login-btn" onClick={submitHandler}>
                SIGN-IN
              </button>
              <center>
                <div
                  style={{
                    width: "230px",
                    display: "flex",
                    marginTop: "10px",
                  }}
                >
                  <h6>Don't have an account?</h6>
                  <Link to="/registration">
                    {" "}
                    <h6
                      style={{
                        color: "blue",
                        marginLeft: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Create an account?
                    </h6>
                  </Link>
                </div>
              </center>
            </div>
            <div className="login-container-right-wrapper">
              <img src={LoginImage} width="390px" alt="Login" />
            </div>
          </div>

          {/* body end */}
        </div>
        <Footter />
      </div>
    </div>
  );
}

export default Login;
