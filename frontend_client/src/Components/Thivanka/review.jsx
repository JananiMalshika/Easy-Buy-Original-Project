import React from 'react'
import "../../Css/Thivanka/review.css";
import Rating from "@mui/material/Rating";

function Review(props) {
  return (
    <div className="review-main-container clearfix">
      <div className="review-header-wrapper clearfix">
        <Rating
          name="half-rating"
          defaultValue={props.rate}
          readOnly
          size="small"
          style={{ float: "right" }}
        />
        <p className="reviewer-name">{props.name}</p>
      </div>
      <div className="review-body-wrapper clearfix">
        <p className="reviewer-riview">{props.review}</p>
        <p className="review-date">{props.date}</p>
      </div>
    </div>
  );
}

export default Review