import React, { useState } from "react";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import "../../Css/Janani/registration.css";
import axios from "axios";
import LoginImage from "../../Assets/reg.png";
import { useNavigate } from "react-router";
import validator from "validator";

function Regitstration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setContry] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const submitHandler = () => {
    if (name.trim().length === 0) {
      alert("All the fields required!");
    } else if (email.trim().length === 0) {
      alert("All the fields required!");
    } else if (!validator.isEmail(email)) {
      alert("Please enter valid email");
    } else if (country.trim().length === 0) {
      alert("All the fields required!");
    } else if (password.trim().length === 0) {
      alert("All the fields required!");
    } else {
      const data = { name, email, country, password };

      axios
        .post("http://localhost:8000/user/data/save", data)
        .then((res) => {
          navigation("/");
          alert(res.data.message);
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
          <div className="reg-container">
            <div className="reg-container-left-wrapper">
              <img src={LoginImage} width="390px" alt="Login" />
            </div>
            <div className="reg-container-right-wrapper">
              <h3>Create Your Account!!!</h3>
              <br />

              <input
                type="text"
                placeholder="Please Enter Your Name..."
                className="input-fields"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <br />
              <input
                type="email"
                placeholder="Please Enter Your Email..."
                className="input-fields"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <br />
              <select
                className="input-fields"
                onChange={(e) => {
                  setContry(e.target.value);
                }}
              >
                <option value="none">Select Your Country...</option>
                <option value="IN">India</option>
                <option value="US">America</option>
                <option value="SL">Sri-Lanka</option>
                <option value="NZ">New Zealand</option>
                <option value="UK">UK</option>
                <option value="Ausi">Australia</option>
                <option value="Can">Canada</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Rus">Russia</option>
                <option value="Italy">Italy</option>
              </select>
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
              <button className="reg-btn" onClick={submitHandler}>
                SIGN-UP
              </button>
            </div>
          </div>

          {/* body end */}
        </div>
        <Footter />
      </div>
    </div>
  );
}

export default Regitstration;
