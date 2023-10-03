import React from 'react'
import "../../Css/Thivanka/footter.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MobApp from "../../Assets/app.png";
 

function Footter() {
  return (
    <div className="footter-main-container">
      <div className="footter-container-one">
        <div className="section-wrapper">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Company
          </p>
          <p style={{ cursor: "pointer" }}>About Us</p>
          <p style={{ cursor: "pointer" }}>Contact Us</p>
          <p style={{ cursor: "pointer" }}>Our Work</p>
          <p style={{ cursor: "pointer" }}>Our Team</p>
          <p style={{ cursor: "pointer" }}>Our Culture</p>
        </div>
      </div>
      <div className="footter-container-two">
        <div className="section-wrapper">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "white",
              marginBottom: "10px",
            }}
          >
            CUSTOMER CARE
          </p>
          <p style={{ cursor: "pointer" }}>My Account</p>
          <p style={{ cursor: "pointer" }}>Where is my order?</p>
          <p style={{ cursor: "pointer" }}>FAQ</p>
          <p style={{ cursor: "pointer" }}>Shipping & Delivery</p>
          <p style={{ cursor: "pointer" }}>Payment FAQ</p>
        </div>
      </div>
      <div className="footter-container-three">
        <div className="section-wrapper">
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "white",
              marginBottom: "10px",
            }}
          >
            Services
          </p>
          <p style={{ cursor: "pointer" }}>Our Approach</p>
          <p style={{ cursor: "pointer" }}>Web</p>
          <p style={{ cursor: "pointer" }}>Brand</p>
          <p style={{ cursor: "pointer" }}>Product</p>

          <img src={MobApp} width="120px" height="70px" style={{marginTop:"6px",marginLeft:"-5px"}} />
        </div>
      </div>
      <div className="footter-container-four">
        <div className="feedback-section-wrapper">
          <center>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "500",
                color: "white",
                marginBottom: "5px",
              }}
            >
              Feedback
            </p>
            <input
              type="email"
              placeholder="Your email..."
              className="feedback-input"
            />
            <br />
            <input
              type="email"
              placeholder="Your feedback..."
              className="feedback-input"
            />
            <br />
            <button className="feedback-submit-btn">Submit</button>
          </center>
          <div className="social-section-wrapper">
            <p
              style={{
                fontSize: "15px",
                fontWeight: "500",
                color: "white",
                marginBottom: "5px",
                marginTop: "10px",
              }}
            >
              Follow Us
              <br />
              <FacebookIcon style={{ marginTop: "5px" }} />
              <TwitterIcon style={{ marginTop: "5px", marginLeft: "5px" }} />
              <YouTubeIcon style={{ marginTop: "5px", marginLeft: "5px" }} />
              <LinkedInIcon style={{ marginTop: "5px", marginLeft: "5px" }} />
              <MarkunreadIcon style={{ marginTop: "5px", marginLeft: "5px" }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footter