import React from 'react'
import "../../Css/Thivanka/nav_bar.css";
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <div className="site-nav-container">
      {/* <div className="site-nav-logo-wrapper"></div> */}
      <div className="site-nav-logo-wrapper"></div>
      <div className="site-nav-links-wrapper">
        <Link to="/home" className="site-nav-link">
          <div className="site-nav-links">Home</div>
        </Link>
        <Link to="#" className="site-nav-link">
          <div className="site-nav-links">Products</div>
        </Link>
        <Link to="#" className="site-nav-link">
          <div className="site-nav-links">About</div>
        </Link>
        <Link to="#" className="site-nav-link">
          <div className="site-nav-links">Contact Us</div>
        </Link>
        <Link to="#" className="site-nav-link">
          <div className="site-nav-links">Blog</div>
        </Link>
      </div>
      <div className="site-nav-logo-wrapper"></div>

      {/* <div className="site-nav-profile">
        <div className="site-nav-profile-icon">
          <Profile />
        </div>
      </div> */}
    </div>
  );
}

export default NavBar