import React from "react";
import Rating from "@mui/material/Rating";
import "../../Css/Thivanka/home_page.css";
import { useNavigate } from "react-router-dom";

function Product(props) {
const navigate=useNavigate()
  const itemHandler = () => {
    navigate(
      `/item/${props.category}/${props.item_name}/${props.item_price}/${props.rate}/${props.id}`
    );
  }

  return (
    <div className="product-container" onClick={itemHandler}>
      <div className="product-wrapper">
        <img src={props.pic} alt="Product" className="product-image" />
        <div className="product-details-wrapper">
          <p style={{ fontSize: "10px", marginLeft: "5px" }}>
            {props.category}
          </p>
          <p style={{ fontSize: "14px", fontWeight: "500", marginLeft: "5px" }}>
            {props.item_name}
          </p>
          <div style={{ display: "flex", width: "100%" }}>
            <p
              style={{
                width: "50%",
                fontSize: "15px",
                fontWeight: "500",
                marginTop: "5px",
                marginLeft: "5px",
                color: "orange",
              }}
            >
              Rs {props.item_price}
            </p>
            <Rating
              name="half-rating"
              defaultValue={props.rate}
              readOnly
              size="small"
              style={{ marginTop: "6px" }}
              precision={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
