import React, { useState, useEffect } from "react";
import "../../Css/Thivanka/home_page.css";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Item from "../../Assets/item.jpg";
import Product from "../../Components/Thivanka/product";
import Footter from "../../Components/Thivanka/footter";
import axios from "axios";

function HomePage() {
  const [details, setDetial] = useState([]);
  const [found, setFound] = useState("");

  function getItem() {
    axios
      .get("http://localhost:8000/client/product/get")
      .then((res) => {
        if (res.data.status === true) {
          setDetial(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    getItem();
  }, []);

  const item = details.filter((data) => {
    return (
      data.name.toLowerCase().includes(found.toLowerCase()) ||
      data.category.toLowerCase().includes(found.toLowerCase())
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
        <div className="site-filter-wrapper clearfix">
          <center>
            <input
              type="search"
              placeholder="Search by name..."
              className="site-filter-inputs first"
              onChange={(e) => {
                setFound(e.target.value);
              }}
            />
            <input
              type="search"
              placeholder="Search by category..."
              className="site-filter-inputs"
              onChange={(event) => {
                setFound(event.target.value);
              }}
            />
          </center>
        </div>
        <div className="site-details-wrapper clearfix">
          <div className="site-details-cat-topic">
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              Just Arrived
            </p>
            <hr style={{}} />
          </div>

          {item.map((detail, index) => (
            <Product
              pic={detail.url}
              category={detail.category}
              item_name={detail.name}
              item_price={detail.price}
              rate={detail.totRating}
              id={detail.id}
            />
          ))}
        </div>
        {/* <div className="site-item-category-container">
          <div className="site-item-category-wrapper">
            <div style={{ paddingTop: "40px" }}>
              <hr style={{ float: "left", width: "38%", marginTop: "12px" }} />
              <p
                style={{
                  float: "left",
                  marginLeft: "18px",
                  fontSize: "19px",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                {""}BROWSE OUR CATEGORIES
              </p>
              <hr style={{ float: "right", width: "38%", marginTop: "12px" }} />
            </div>
            <div className="site-item-category clearfix">
              <Category name="Handicrafts" />
              <Category name="Spices" />
              <Category name="Cloths" />
              <Category name="Masks" />
              <Category name="Bathik" />
              <Category name="Foods" />
              <Category name="Handicrafts" />
              <Category name="Spices" />
              <Category name="Cloths" />
              <Category name="Masks" />
              <Category name="Bathik" />
              <Category name="Foods" />
              <Category name="Bathik" />
              <Category name="Foods" />
              <Category name="Handicrafts" />
              <Category name="Spices" />
              <Category name="Cloths" />
              <Category name="Masks" />
              <Category name="Bathik" />
              <Category name="Foods" />
              <Category name="Bathik" />
              <Category name="Foods" />
              <Category name="Handicrafts" />
              <Category name="Spices" />
              <Category name="Cloths" />
              <Category name="Masks" />
              <Category name="Bathik" />
              <Category name="Foods" />
            </div>
          </div>
        </div>
        <div className="site-details-wrapper clearfix">
          <div className="site-details-cat-topic">
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "5px",
              }}
            >
              Most Popular
            </p>
            <hr />
          </div>
          <Product
            pic={Item2}
            category="GARDENING and PLANTING"
            item_name="Wooden Planter small "
            item_price="1500.00"
            rate="4"
          />
          <Product
            pic={Item}
            category="GARDENING and PLANTING"
            item_name="Wooden Planter small"
            item_price="1500.00"
            rate="4"
          />
          <Product
            pic={Item2}
            category="GARDENING and PLANTING"
            item_name="Wooden Planter small"
            item_price="1500.00"
            rate="4"
          />
          <Product
            pic={Item3}
            category="GARDENING and PLANTING"
            item_name="Wooden Planter small"
            item_price="1500.00"
            rate="4"
          />
          <Product
            pic={Item3}
            category="GARDENING and PLANTING"
            item_name="Wooden Planter small"
            item_price="1500.00"
            rate="4"
          />
        </div> */}
        <Footter />
      </div>
    </div>
  );
}
export default HomePage;

function Category(props) {
  return (
    <div>
      <img
        src={Item}
        alt="Category"
        width="200px"
        height="130px"
        style={{ margin: "15px", borderRadius: "8px" }}
      />
      <div
        style={{
          height: "40px",
          width: "200px",
          backgroundColor: "black",
          fontSize: "19px",
          color: "white",
          fontWeight: "600",
          marginTop: "-112px",
          marginLeft: "15px",
          position: "relative",
          opacity: 0.7,
          paddingTop: "12px",
        }}
      >
        <center>
          <p>{props.name}</p>
        </center>
      </div>
    </div>
  );
}
