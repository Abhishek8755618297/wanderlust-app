const express = require("express");
const router = express.Router();
const wrapAsync= require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};




//5 index route
router.get("/", wrapAsync(async (req, res) => {
   const allListings = await Listing.find({});
   res.render("listings/index.ejs", { allListings });
})); 



//7 New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
}); 


 
//6 Read: Show Route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params; //extract id
   const listing = await Listing.findById(id).populate("reviews");  // find by id listing data
   if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
   }
    res.render("listings/show.ejs", { listing });
}));





//7 Create route    
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    // let result = listingSchema.validate(req.body);
    // console.log(result);
    // if(result.error) {
    //     throw new ExpressError(400, result.error);
    // }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
}));
 


// 8 edit Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
   if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
   }
    res.render("listings/edit.ejs", { listing });
}));


//8 update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!");
    res.redirect("/listings");
})); 
 

//9 Delete Route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
   let deletedListing = await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}));


module.exports = router;