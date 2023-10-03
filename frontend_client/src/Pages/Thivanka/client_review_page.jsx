import React, { useState,useEffect} from "react";
import "../../Css/Thivanka/client_review_page.css";
import "../../Css/Thivanka/home_page.css";
import Item from "../../Assets/item3.jpg";
// import Item2 from "../../Assets/item2.jpg";
import NavBar from "../../Components/Thivanka/nav_bar";
import HomeHeader from "../../Components/Thivanka/home_header";
import Footter from "../../Components/Thivanka/footter";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import axios from "axios";

function ClientReviewPage() {
  // const [active, setActive] = useState(true);
  const [image, setImage] = useState({});
  const [rating, setValue] = useState();
  const [comment, setComment] = useState('');
  const params = useParams();
  const itemId = params.itemId;
  const oId = params.oid;
  const name = localStorage.getItem("name");

  const data = {
    name: name,
    review: rating,
    comment: comment,
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/client/order/item/image/${itemId}`)
      .then((res) => {
        if (res.data.status === true) {
          setImage(res.data.details);
        } else {
          alert(res.data.message);
        }
      })

      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const ratingHandler = () => {
    if (!rating) {
      alert("Please give a rating.");
    }
    else if (comment.trim().length === 0) {
       alert("Please give a review.");
    } else {
      axios
        .post(
          `http://localhost:8000/client/item/rating/save/${itemId}/${oId}`,
          data
        )
        .then((res) => {
          if (res.status === true) {
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
      
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
        <div className="site-details-wrapper clearfix">
          <div className="review-form-container">
            <div className="review-form-wrapper">
              {/* {active ? ( */}
              <div>
                <img
                  src={image.image}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  alt="items"
                />

                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginTop: "10px",
                  }}
                >
                  Would you like to share your exercise with others?
                </p>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  Product Review
                </p>

                <Rating
                  name="size-large"
                  defaultValue={0}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
                <br />
                <br />
                <textarea
                  rows={5}
                  cols={50}
                  placeholder="Give a comment..."
                  style={{
                    padding: "10px",
                    resize: "none",
                    outline: "none",
                    borderRadius: "5px",
                    fontFamily: "cursive",
                  }}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <br />
                <button className="order-rating-btn" onClick={ratingHandler}>
                  Continue
                </button>
              </div>
              {/* ) : (
                <div>
                  <img
                    src={Item2}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    alt="items"
                  />

                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      marginTop: "10px",
                    }}
                  >
                    Would you like to recomond this seller?
                  </p>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    Seller Rating
                  </p>

                  <Rating name="size-large" defaultValue={0} size="large" />
                  <br />
                  <br />
                  <textarea
                    rows={5}
                    cols={50}
                    placeholder="Give a feedback..."
                    style={{
                      padding: "10px",
                      resize: "none",
                      outline: "none",
                      borderRadius: "5px",
                      fontFamily: "cursive",
                    }}
                  />
                  <br />
                  <button className="order-rating-btn">Submit</button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
      <Footter />
    </div>
  );
}

export default ClientReviewPage;
