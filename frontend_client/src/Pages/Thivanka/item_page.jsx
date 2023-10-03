import React, { useState,useEffect } from "react";
import "../../Css/Thivanka/item_page.css";
import NavBar from "../../Components/Thivanka/nav_bar";
import Rating from "@mui/material/Rating";
import Review from "../../Components/Thivanka/review";
import HomeHeader from "../../Components/Thivanka/home_header";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ListIcon from "@mui/icons-material/List";
import Footter from "../../Components/Thivanka/footter";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ItemPage() {
  const navigate = useNavigate();
  const [details,setDetails]=useState([]);
  const params = useParams();
  const [active, setActive] = useState(true);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [status] = useState(true);
  const [count, setCount] = useState(1);
  const email = localStorage.getItem("email");
  const category = params.category;
  const name = params.name;
  const price = params.price;
  const rate = params.rate;
  const id = params.id;

  const disHandler = () => {
    setActive(true);
    setActive1(false);
    setActive2(false);
  };
  const addDisHandler = () => {
    setActive(false);
    setActive1(true);
    setActive2(false);
  };

  const reviewHandler = () => {
    setActive(false);
    setActive1(false);
    setActive2(true);
  };

  const countAddHandler = () => {
    setCount(count + 1);
  };
  const countRemoveHandler = () => {
    if (count === 0) {
      setCount(0);
    } else {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/client/each/item/${id}`)
      .then((res) => {
        if (res.data.status === true) {
          setDetails(res.data.data)
        }
        else {
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  },[])

  const item = {
    itemID: id,
    itemName: name,
    itemURL: details.image,
    sellerID: details.sellerID,
    qty: count,
    price: price,
    category: category,
  };

  const data = {
    email: email,
    items: item,
  };

  const addToCartHandler = () => {
    axios
      .post("http://localhost:8000/client/cart/item/save", data)
      .then((res) => {
        if (res.data.status === true) {
          navigate("/cart");
        }
      })
      .catch((error) => {
        console.log(error);
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
        {/* <div className="site-filter-wrapper clearfix">
          <center>
            <input
              type="search"
              placeholder="Search by name..."
              className="site-filter-inputs first"
            />
            <input
              type="search"
              placeholder="Search by category..."
              className="site-filter-inputs"
            />
          </center>
        </div> */}
        <div className="site-details-wrapper clearfix">
          <div style={{ display: "flex", width: "100%", marginTop: "20px" }}>
            <div className="items-category-container">
              <div className="items-category">
                <div
                  style={{
                    display: "flex",
                    marginBottom: "5px",
                    paddingLeft: "10px",
                  }}
                >
                  <ListIcon fontSize="small" />
                  <h5>Categories</h5>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Men's Fashion</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Spices</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Bags & Shoes</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
                <div className="list-category-items">
                  <ListIcon fontSize="small" />
                  &nbsp;
                  <p style={{ fontSize: "13px" }}>Jewelry & Watches</p>
                </div>
              </div>
            </div>
            <div style={{ width: "80%" }}>
              <div className="item-details-main-container ">
                <div className="item-image-wrapper clearfix">
                  <img
                    src={details.image}
                    alt="Product"
                    width="250px"
                    height="200px"
                    style={{ borderRadius: "5px" }}
                  />
                </div>
                <div className="item-detail-wrapper">
                  <div className="item-detail-header">
                    <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                      {name}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        marginTop: "2px",
                        marginBottom: "5px",
                      }}
                    >
                      {category}
                    </p>
                    <Rating
                      name="half-rating"
                      defaultValue={rate}
                      precision={0.5}
                      readOnly
                    />
                  </div>
                  <div className="item-detail-body">
                    <div className="item-detail-question">
                      <p>Status</p>
                      <p>Stock</p>
                      <p>Price  </p>
                      <p>Shipping Fee</p>
                    </div>
                    <div className="item-detail-answer">
                      <p>
                        {status ? (
                          <p style={{ color: "green" }}>Available</p>
                        ) : (
                          <p style={{ color: "red" }}>Unavailable</p>
                        )}
                      </p>
                      <p>21 Items</p>
                      <p style={{ color: "#A47148" }}>Rs {price}</p>
                      <p style={{ color: "#A47148" }}>Rs 250.00</p>
                    </div>
                  </div>
                  <div className="item-cart-container">
                    <div className="item-cart-count">
                      <RemoveIcon
                        onClick={countRemoveHandler}
                        className="item-cart-action-btn"
                        fontSize="small"
                      />
                      <p
                        style={{
                          marginRight: "7px",
                          marginLeft: "7px",
                          fontSize: "15px",
                          fontWeight: "500",
                        }}
                      >
                        {count}
                      </p>
                      <AddIcon
                        onClick={countAddHandler}
                        className="item-cart-action-btn"
                        fontSize="small"
                      />
                    </div>
                    <div
                      className="item-cart-add-btn"
                      onClick={addToCartHandler}
                    >
                      <p
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          marginTop: "3px",
                          marginRight: "1px",
                        }}
                      >
                        ADD TO CART
                      </p>
                      &nbsp;
                      <ShoppingCartIcon className="cart-add-btn-icon" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="more-item-details-main-container">
                <div className="more-item-details-header-wrapper">
                  <div
                    onClick={disHandler}
                    className={
                      active
                        ? "more-item-details-header active-header"
                        : "more-item-details-header"
                    }
                  >
                    Discription
                  </div>
                  <div
                    onClick={addDisHandler}
                    className={
                      active1
                        ? "more-item-details-header active-header"
                        : "more-item-details-header"
                    }
                  >
                    Seller Details
                  </div>
                  <div
                    onClick={reviewHandler}
                    className={
                      active2
                        ? "more-item-details-header active-header"
                        : "more-item-details-header"
                    }
                  >
                    Reviews
                  </div>
                </div>
                <div className="more-item-details-body-wrapper">
                  {active ? (
                    <div className="more-item-details-body">
                      {details.Description}
                    </div>
                  ) : active1 ? (
                    <div className="more-item-details-body">
                      {details.Description}
                    </div>
                  ) : (
                    <div className="more-item-details-body">
                      {details.ratings.map((detail, index) => (
                        <Review
                          rate={detail.Review}
                          name={detail.Name}
                          review={detail.Comment}
                          date={detail.Date}
                          key={index}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footter />
      </div>
    </div>
  );
}

export default ItemPage;
