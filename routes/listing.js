const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

 

router.route("/")
.get(wrapAsync(listingController.index))  // 5 index route
.post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing)); // 7 create route

//7 New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


//Search Bar functionality
router.get("/search", listingController.search);


//Category filter feature 
router.get("/filter/:category", async (req, res) => {
  const { category } = req.params;
  const allListings = await Listing.find({ category });
  res.render("listings/index", { allListings });
});


 

router.route("/:id")
.get(wrapAsync(listingController.showListing))  //6 Read: Show Route
.put(isLoggedIn, isOwner, validateListing, upload.single('listing[image]'), wrapAsync(listingController.updateListing))  //8 update route
.delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); //9 Delete Route



  
// 8 edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));





module.exports = router;



