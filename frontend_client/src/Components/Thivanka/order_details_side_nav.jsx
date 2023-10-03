import React from 'react'
import "../../Css/Thivanka/order_page.css";
import {NavLink} from "react-router-dom"

function OrderSideNav() {
  return (
    <div className="client-side-menu-container">
      <center>
        <h3>Order Details</h3>
      </center>
      <br />
      <NavLink to="/order" style={{ textDecoration: "none", color: "black" }}>
        <div className="client-side-menu-link">Orders</div>
      </NavLink>
      <NavLink
        to="/to-be-shipped"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="client-side-menu-link">To be shipped</div>
      </NavLink>
      <NavLink
        to="/shipped"
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="client-side-menu-link">Shipped</div>
      </NavLink>
      <NavLink to="/review" style={{ textDecoration: "none", color: "black" }}>
        <div className="client-side-menu-link">To Be Review</div>
      </NavLink>
    </div>
  );
}

export default OrderSideNav