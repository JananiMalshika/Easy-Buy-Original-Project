const router = require("express").Router();
const Cart = require("../../Models/Thivanka/cart");
const Order = require("../../Models/Thivanka/order");
const Product = require("../../Models/Deborah/items");

// client's items save in the cart
router.route("/cart/item/save").post(async (req, res) => {
  const itemDetails = req.body;
  const items = await Cart.findOne({ email: { $eq: itemDetails.email } });
  if (!items) {
    const cart = new Cart(itemDetails);
    await cart 
      .save()
      .then((data) => {
        res.json({ status: true, data });
      })
      .catch((err) => {
        res.json({ status: false, err });
      });
  } else {
    await Cart.findOneAndUpdate(
      { email: itemDetails.email },
      { $push: { items: itemDetails.items } }
    )
      .then((data) => {
        res.json({ status: true, data });
      })
      .catch((err) => {
        res.json({ status: false, err });
      });
  }
});

// client's items get from the cart
router.route("/cart/item/:email").get(async (req, res) => {
  const email = req.params.email;
  Cart.findOne({ email: { $eq: email } })
    .then((data) => {
      if (!data) {
        res.json(null);
      } else {
        res.json(data.items);
      }
    })
    .catch((err) => {
      res.json({ status: false, err });
    });
});

// client's items remove from the cart
router.route("/cart/item/remove/:email/:id").delete(async (req, res) => {
  const email = req.params.email;
  const id = req.params.id;
  Cart.updateOne({ email: email }, { $pull: { items: { _id: id } } })
    .then((data) => {
      res.json({ status: data.acknowledged });
    })
    .catch((err) => {
      res.json({ status: false, err });
    });
});

// client's items remove from the cart
router.route("/cart/item/clear/:email").delete(async (req, res) => {
  const email = req.params.email;
  Cart.deleteOne({ email: email })
    .then((data) => {
      res.json({ status: data.acknowledged });
    })
    .catch((err) => {
      res.json({ status: false, err });
    });
});

//save orders
router.route("/order/save").post(async (req, res) => {
  const {
    customerId,
    customerName,
    customerAddress,
    customerContact,
    product,
  } = req.body;

  const d = new Date();
  let month = d.getMonth();
  let today_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  const order = new Order({
    orderDate: today_date,
    customerId: customerId,
    customerName: customerName,
    customerAddress: customerAddress,
    customerContact: customerContact,
    Status: "Pending",
    month: month,
    product: product,
  });

  await order
    .save()
    .then((data) => {
      res.json({ status: true, data });
    })
    .catch((err) => {
      res.json({ status: false, err });
    });
});

//get orders
router.route("/order/:state").get(async (req, res) => {
  const state = req.params.state;
  Order.find({ Status: { $eq: state } })
    .then((data) => {
      res.json({ status: true, data });
    })
    .catch((err) => {
      res.json({ status: false, message: "Something went wrong!" });
    });
});

//get orders
router.route("/order/count/:state").get(async (req, res) => {
  const state = req.params.state;
  Order.find({ Status: { $eq: state } })
    .then((data) => {
      res.json({ status: true, count: data.length });
    })
    .catch((err) => {
      res.json({ status: false, message: "Something went wrong!" });
    });
});

//get specific orders
router.route("/special/order/:id").get(async (req, res) => {
  const id = req.params.id;
  Order.findOne({ _id: { $eq: id } })
    .then((data) => {
      res.json({ status: true, data, product: data.product });
    })
    .catch((err) => {
      res.json({ status: false, message: "Something went wrong!" });
    });
});

//update order status
router.route("/order/state/update/:id/:state").put((req, res) => {
  const id = req.params.id;
  const state = req.params.state;

  Order.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        Status: state,
      },
    }
  )
    .then((data) => {
      res.json({ status: true, message: "Order state is changed!" });
    })
    .catch((err) => {
      res.json({ status: false, message: "Something went wrong!" });
    });
});

//get client orders
router.route("/order/:cId/:state").get(async (req, res) => {
  const state = req.params.state;
  const cId = req.params.cId;
  const dataArr = [];
  Order.find({
    $and: [{ Status: { $eq: state } }, { customerId: { $eq: cId } }],
  }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      // res.json({ status: true, data: details[1].product.length });
      // res.json({ status: true, data: details });
      function getData(details) {
        for (let x = 0; x < details.length; x++) {
          for (let y = 0; y < details[x].product.length; y++) {
            const newObj = {
              product: details[x].product[y],
              orderDate: details[x].orderDate,
              oId: details[x]._id,
            };
            dataArr.push(newObj);
          }
        }
        return dataArr;
      }
      function fetchData() {
        const productDetails = getData(details);
        res.json({ status: true, order: productDetails.reverse() });
      }

      fetchData();
    }
  });
});

//get client orders
router.route("/all/order/:cId").get(async (req, res) => {
  const cId = req.params.cId;
  const dataArr = [];
  Order.find({ customerId: { $eq: cId } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      // res.json({ status: true, data: details[1].product.length });
      // res.json({ status: true, data: details });
      function orderData(details) {
        for (let x = 0; x < details.length; x++) {
          for (let y = 0; y < details[x].product.length; y++) {
            const newObj = {
              product: details[x].product[y],
              orderDate: details[x].orderDate,
              oId: details[x]._id,
              state: details[x].Status,
            };
            dataArr.push(newObj);
          }
        }
        return dataArr;
      }
      function fetchData() {
        const productDetails = orderData(details);
        res.json({ status: true, order: productDetails.reverse() });
      }

      fetchData();
    }
  });
});

//get client orders
router.route("/to-be-review/order/:cId").get(async (req, res) => {
  const state = "Completed";
  const cId = req.params.cId;
  const dataArr = [];
  Order.find({
    $and: [{ Status: { $eq: state } }, { customerId: { $eq: cId } }],
  }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      // res.json({ status: true, data: details[1].product.length });
      // res.json({ status: true, data: details });
      function getData(details) {
        for (let x = 0; x < details.length; x++) {
          for (let y = 0; y < details[x].product.length; y++) {
            if (details[x].product[y].isReviewed === false) {
              const newObj = {
                product: details[x].product[y],
                orderDate: details[x].orderDate,
                oId: details[x]._id,
              };
              dataArr.push(newObj);
            }
          }
        }
        return dataArr;
      }
      function fetchData() {
        const productDetails = getData(details);
        res.json({ status: true, order: productDetails.reverse() });
      }

      fetchData();
    }
  });
});

//summery client orders
router.route("/summery/order").get(async (req, res) => {
  let jan = 0;
  let feb = 0;
  let march = 0;
  let april = 0;
  let may = 0;
  let jun = 0;
  let jul = 0;
  let aug = 0;
  let sep = 0;
  let oct = 0;
  let nov = 0;
  let dec = 0;
  let dataArr = [];

  Order.find({ Status: { $eq: "Completed" } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      function fetchData() {
        const productDetails = getEachMonthData(details);
        res.json({ status: true, data: productDetails });
      }
      fetchData();
      function getEachMonthData(details) {
        for (let x = 0; x < details.length; x++) {
          if (details[x].month == "1") {
            jan = jan + details[x].product.length;
          } else if (details[x].month == "2") {
            feb = feb + details[x].product.length;
          } else if (details[x].month == "3") {
            march = march + details[x].product.length;
          } else if (details[x].month == "4") {
            april = april + details[x].product.length;
          } else if (details[x].month == "5") {
            may = may + details[x].product.length;
          } else if (details[x].month == "6") {
            jun = jun + details[x].product.length;
          } else if (details[x].month == "7") {
            jul = jul + details[x].product.length;
          } else if (details[x].month == "8") {
            aug = aug + details[x].product.length;
          } else if (details[x].month == "9") {
            sep = sep + details[x].product.length;
          } else if (details[x].month == "10") {
            oct = oct + details[x].product.length;
          } else if (details[x].month == "11") {
            nov = nov + details[x].product.length;
          } else if (details[x].month == "12") {
            dec = dec + details[x].product.length;
          }
        }
        dataArr.push(
          { name: "Jan", Orders: jan },
          { name: "Feb", Orders: feb },
          { name: "Mar", Orders: march },
          { name: "Apr", Orders: april },
          { name: "May", Orders: may },
          { name: "Jun", Orders: jun },
          { name: "Jul", Orders: jul },
          { name: "Aug", Orders: aug },
          { name: "Sep", Orders: sep },
          { name: "Oct", Orders: oct },
          { name: "Nov", Orders: nov },
          { name: "Dec", Orders: dec }
        );
        return dataArr;
      }
    }
  });
});

router.route("/item/rating/save/:itemId/:oid").post(async (req, res) => {
  const id = req.params.itemId;
  const oid = req.params.oid;
  const { name, review, comment } = req.body;

  let today = new Date();
  let date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  function ratingFunc(name, review, comment, date) {
    return new Promise((resolve) => {
      Product.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            ratings: [
              {
                Name: name,
                Date: date,
                Review: review,
                Comment: comment, 
              },
            ],
          },
        }
      )
        .then((data) => {
          if (data) {
            resolve(true);
          }
        })
        .catch((err) => {
          res.json({
            status: false,
            message: "Try again later!",
          });
        });
    });
  }
  async function callFunc(iid, oid) {
    const status = await ratingFunc(name, review, comment, date);
    if (status === true) {
      Order.updateOne(
        { _id: oid, "product.productId": iid },
        { $set: { "product.$.isReviewed": true } }
      ).then((data) => {
        if (data.modifiedCount > 0) {
          res.json({
            status: true,
            message: "Thank you for your valuable feedback!",
          });
        } else {
          res.json({
            status: false,
            message: "Try again later!",
          });
        }
      });
    } else {
      res.json({ status: false, message: "Something went wrong!" });
    }
  }
  callFunc(id, oid);
});

//get specific orders
router.route("/product/get").get(async (req, res) => {
  let tot = 0;
  let newArr = [];
  let newObj = {};
  Product.find().exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      for (let i = 0; i < details.length; i++) {
        for (let y = 0; y < details[i].ratings.length; y++) {
          tot = tot + parseInt(details[i].ratings[y].Review);
        }
        if (details[i].ratings.length === 0) {
          newObj.totRating = 0;
          newObj.id = details[i]._id;
          newObj.url = details[i].image;
          newObj.category = details[i].category;
          newObj.name = details[i].name;
          newObj.price = details[i].price;
          newArr.push(newObj);
          newObj={}
        } else {
          newObj.totRating = tot / details[i].ratings.length;
          newObj.id = details[i]._id;
          newObj.url = details[i].image;
          newObj.category = details[i].category;
          newObj.name = details[i].name;
          newObj.price = details[i].price;
          newArr.push(newObj);
          newObj = {};
        }
      }
      res.json({ status: true, data: newArr });
    }
  });
});

router.route("/each/item/:id").get(async (req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: { $eq: id } })
    .then((data) => {
      res.json({ status: true, data });
    })
    .catch((err) => {
      res.json({ status: false, message: "Something went wrong!" });
    });
});

//summery client orders
router.route("/each-month/order/total").get(async (req, res) => {
  let jan = 0;
  let feb = 0;
  let march = 0;
  let april = 0;
  let may = 0;
  let jun = 0;
  let jul = 0;
  let aug = 0;
  let sep = 0;
  let oct = 0;
  let nov = 0;
  let dec = 0;
  let dataArr = [];

  Order.find({ Status: { $eq: "Completed" } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      function fetchData() {
        const productDetails = getEachMonthData(details);
        res.json({ status: true, data: productDetails });
      }
      fetchData();

      function getEachMonthData(details) {
        for (let x = 0; x < details.length; x++) {
          for (let y = 0; y < details[x].product.length; y++) {
            if (details[x].month == "1") {
              jan = jan + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "2") {
              feb = feb + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "3") {
              march = march + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "4") {
              april = april + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "5") {
              may = may + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "6") {
              jun = jun + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "7") {
              jul = jul + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "8") {
              aug = aug + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "9") {
              sep = sep + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "10") {
              oct = oct + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "11") {
              nov = nov + parseFloat(details[x].product[y].subTotal);
            } else if (details[x].month == "12") {
              dec = dec + parseFloat(details[x].product[y].subTotal);
            }
          }
        }
        dataArr.push(
          { name: "Jan", Total: jan },
          { name: "Feb", Total: feb },
          { name: "Mar", Total: march },
          { name: "Apr", Total: april },
          { name: "May", Total: may },
          { name: "Jun", Total: jun },
          { name: "Jul", Total: jul },
          { name: "Aug", Total: aug },
          { name: "Sep", Total: sep },
          { name: "Oct", Total: oct },
          { name: "Nov", Total: nov },
          { name: "Dec", Total: dec }
        );
        return dataArr;
      }
    }
  });
});

//summery client orders
router.route("/annual/orders/sub-total").get(async (req, res) => {
  let tot = 0;

  Order.find({ Status: { $eq: "Completed" } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      function fetchData() {
        const total = getEachMonthData(details);
        res.json({ status: true, total });
      }
      fetchData();

      function getEachMonthData(details) {
        for (let x = 0; x < details.length; x++) {
          for (let y = 0; y < details[x].product.length; y++) {
            tot = tot + parseFloat(details[x].product[y].subTotal);
          }
        }

        return tot.toFixed(2);
      }
    }
  });
});

router.route("/annual/orders/count").get(async (req, res) => {
   
  Order.find({ Status: { $eq: "Completed" } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      res.json({ status: true, count: details.length });
    }
  });
});

router.route("/pending/orders/count").get(async (req, res) => {
  Order.find({ Status: { $ne: "Completed" } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      res.json({ status: true, count: details.length });
    }
  });
});

//summery client orders
router.route("/pending/orders/sub-total").get(async (req, res) => {
  let tot = 0;

  Order.find({ Status: { $ne: "Completed" } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      function fetchData() {
        const total = getEachMonthTotal(details);
        res.json({ status: true, total });
      }
      fetchData();

      function getEachMonthTotal(details) {
        for (let x = 0; x < details.length; x++) {
          for (let y = 0; y < details[x].product.length; y++) {
            tot = tot + parseFloat(details[x].product[y].subTotal);
          }
        }

        return tot.toFixed(2);
      }
    }
  });
});

router.route("/order/item/image/:iid").get(async (req, res) => {
  const iid=req.params.iid
  Product.findOne({ _id: { $eq: iid } }).exec(function (err, details) {
    if (err) {
      res.json({ status: false, message: "Something went wrong!" });
    } else {
      res.json({ status: true, details });
    }
  });
});

module.exports = router;
