import React from "react";
import "../../Css/Thivanka/shopping_cart.css";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";

function ShoppingCartItems(props) {

 

  const deleteHandler = () => {
     axios
       .delete(`http://localhost:8000/client/cart/item/remove/${props.email}/${props.id}`)
       .then((res) => {
         if (res.data.status === true) {
           window.location.reload(true);
         }
       })
       .catch((err) => {
         console.log(err);
       });
 
  }

  return (
    <div className="shopping-cart-item-container">
      <div className="shopping-cart-item-image clearfix">
        <input
          type="checkbox"
          id="vehicle1"
          name={props.itemId}
          value={props.price * props.qty}
          style={{ cursor: "pointer", backgroundColor: "orange" }}
          onChange={props.checkHandler}
        />
        <center>
          <img
            src={props.image}
            alt="item"
            style={{
              width: "110px",
              height: "70px",
              marginTop: "10px",
              borderRadius: "5px",
              marginLeft: "20px",
            }}
          />
        </center>
      </div>
      <div className="shopping-cart-item-name">
        <center>
          <p style={{ fontSize: "14px", marginTop: "3px", fontWeight: "600" }}>
            {props.name}
          </p>
        </center>

        <p
          style={{
            fontSize: "15px",
            fontWeight: "500",
            marginTop: "20px",
            marginLeft: "5px",
            color: "orange",
          }}
        >
          Rs {props.price} x {props.qty}
        </p>
      </div>
      <div className="shopping-cart-item-action">
        <DeleteOutlineOutlinedIcon
          fontSize="small"
          className="shopping-cart-item-action-btn"
          onClick={deleteHandler}
        />
        <p style={{ fontSize: "16px", marginTop: "52px", color: "#A47148" }}>
          Rs {props.price * props.qty}.00
        </p>
      </div>
    </div>
  );
}

export default ShoppingCartItems;
