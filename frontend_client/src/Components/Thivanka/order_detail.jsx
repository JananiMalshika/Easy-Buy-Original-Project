import React, { useEffect, useState } from "react";
import "../../Css/Thivanka/order_detail.css";
import Item from "../../Assets/item.jpg";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function OrderDetail(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const reviewHandler = () => {
    navigate(`/give/review/${props.itemId}/${props.id}`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/client/order/item/image/${props.pid}`)
      .then((res) => {
        if (res.data.status === true) {
          setData(res.data.details);
        } else {
          alert(res.data.message);
        }
      })

      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="order-detail-container">
      <div className="order-detail-wrapper">
        <div className="order-detail-image">
          <img src={data.image} width="90px" alt="product" />
        </div>
        <div className="order-detail">
          <div className="order-detail-header">
            <div className="order-detail-header-status">
              <StoreMallDirectoryIcon fontSize="small" color="info" />{" "}
              <p
                style={{
                  maxWidth: "30%",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  cursor: "pointer",
                }}
              >
                CHFRPU Official Store
              </p>
              <p style={{ marginLeft: "20%", color: "green" }}>
                {props.status}
              </p>
            </div>
            <div className="order-detail-header-orddetails">
              <p> Order Date : {props.date}</p> <p>Order ID : {props.id}</p>
            </div>
          </div>

          <div className="order-body">
            <div style={{ width: "75%" }}>
              <h3>{props.pname}</h3>
              <p
                style={{
                  marginTop: "5px",
                  fontSize: "13px",
                  fontWeight: "500",
                  marginLeft: "5px",
                }}
              >
                {props.qty} Items
              </p>
              <p
                style={{
                  marginTop: "5px",
                  fontSize: "13px",
                  fontWeight: "400",
                  marginLeft: "5px",
                }}
              >
                Rs {props.price} x {props.qty}
              </p>
            </div>
            <div style={{ width: "25%", paddingTop: "10px" }}>
              <p
                style={{ fontWeight: "500", fontSize: "13px", color: "orange" }}
              >
                Total: {(props.price * props.qty).toFixed(2)}
              </p>
              {props.review && (
                <button className="order-rating-btn" onClick={reviewHandler}>
                  Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
