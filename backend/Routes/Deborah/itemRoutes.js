const express = require("express");
const cloudinary = require("../../utils/cloudinary");
const Items = require("../../Models/Deborah/items");
const router = express.Router();

//to save item details
router.post("/save", (req, res) => {
  const paths = req.file.path;
  const { name, category, quantity, price, status, Description, sellerID } =
    req.body;
  cloudinary.uploader.upload(paths, function (error, result) {
    if (error) {
      console.log(error);
    } else {
      let link = result.secure_url;
      saveProductData(
        link,
        name,
        category,
        quantity,
        price,
        status,
        Description,
        sellerID
      );
    }
  });
  function saveProductData(
    link,
    name,
    category,
    quantity,
    price,
    status,
    Description,
    sellerID
  ) {
    const data = new Items({
      image: link,
      name: name,
      category: category,
      quantity: quantity,
      price: price,
      status: status,
      Description: Description,
      sellerID: sellerID,
    });
    data
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

//read all item details from database
router.get("/getItemDetails", (req, res) => {
  Items.find().exec((err, getAllItems) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: true,
      existingItems: getAllItems,
    });
  });
});

//get specific item's details
router.get("/getOneItem/:id", (req, res) => {
  let itemID = req.params.id;

  Items.findById(itemID, (err, getOneItem) => {
    if (err) {
      return res.status(400).json({
        success: false,
        err,
      });
    }

    return res.status(200).json({
      success: true,
      getOneItem,
    });
  });
});

//update item details
router.put("/itemDetails/update/:id", (req, res) => {
  Items.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (err, itemDetails) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }

      return res.status(200).json({
        success: "updated",
      });
    }
  );
});

//delete specific item's details
router.delete("/itemDetails/delete/:id", (req, res) => {
  Items.findByIdAndRemove(req.params.id).exec((err, deletedItemDetails) => {
    if (err) {
      return res.status(400).json({
        message: "Delete unsuccessful",
        err,
      });
    }

    return res.json({
      message: "Delete successful",
      deletedItemDetails,
    });
  });
});

module.exports = router;
