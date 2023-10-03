import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Css/Thivanka/order_page.css";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import OrderSideNav from "../../Components/Thivanka/order_details_side_nav";
import OrderDetail from "../../Components/Thivanka/order_detail";

function ShippedPage() {
  const [details, setDetails] = useState([]);
  const [found, setFound] = useState("");
  const Id = localStorage.getItem("id");

  useEffect(() => {
    axios
      .get(`http://localhost:8000/client/order/${Id}/Shipped`)
      .then((res) => {
        if (res.data.status === false) {
          alert(res.data.message);
        } else {
          setDetails(res.data.order);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
    const item = details.filter((data) => {
      return (
        data.product.productName.toLowerCase().includes(found.toLowerCase()) ||
        data.oId.toLowerCase().includes(found.toLowerCase())
      );
    });
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
          <div className="client-review-component-container">
            <OrderSideNav />
            <div className="client-side-menu-item-container">
              <div className="client-orders-filter-wrapper">
                <h3 style={{ marginLeft: "20px" }}>Shipped</h3>
                <br />
                <input
                  type="text"
                  className="order-filter-inputs"
                  placeholder="Search..."
                  onChange={(event) => {
                    setFound(event.target.value);
                  }}
                />
              </div>
              <div className="client-orders-wrapper">
                {item.map((detail, index) => (
                  <OrderDetail
                    delete={false}
                    review={false}
                    status="Shipped"
                    pname={detail.product.productName}
                    qty={detail.product.productQty}
                    price={detail.product.productPrice}
                    date={detail.orderDate}
                    id={detail.oId}
                    pid={detail.product.productId}
                  />
                ))}
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

export default ShippedPage;
