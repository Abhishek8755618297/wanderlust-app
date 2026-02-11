const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};


//search 


module.exports.search = async (req, res) => {
  try {
    let input = req.query.q;
    
    // Input validation
    if (!input || input.trim() === "") {
      req.flash("error", "Please enter a search query!");
      return res.redirect("/listings");
    }

    input = input.trim().replace(/\s+/g, " ");

    // Capitalize each word
    const element = input
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // 1️⃣ Search by Title
    let allListings = await Listing.find({
      title: { $regex: element, $options: "i" },
    });

    // 2️⃣ If not found, search by Category
    if (allListings.length === 0) {
      allListings = await Listing.find({
        category: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
    }

    // 3️⃣ If not found, search by Country
    if (allListings.length === 0) {
      allListings = await Listing.find({
        country: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
    }

    // 4️⃣ If not found, search by Location
    if (allListings.length === 0) {
      allListings = await Listing.find({
        location: { $regex: element, $options: "i" },
      }).sort({ _id: -1 });
    }

    // 5️⃣ If input is a number, search by Price <= input
    if (allListings.length === 0 && !isNaN(Number(element))) {
      allListings = await Listing.find({ price: { $lte: Number(element) } }).sort({ price: 1 });
    }

    // 6️⃣ Render results or show error
    if (allListings.length > 0) {
      res.locals.success = "Listings found based on your search!";
      return res.render("listings/index.ejs", { allListings });
    } else {
      req.flash("error", "No listings found based on your search!");
      return res.redirect("/listings");
    }
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong while searching!");
    return res.redirect("/listings");
  }
};






module.exports.showListing = async (req, res) => {
  let { id } = req.params; //extract id
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner"); // find by id listing data

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "..", filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename }; // url and file save mongo newListing.save()
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image?.url;
  if (originalImageUrl) {
    originalImageUrl = originalImageUrl.replace(
      "/upload/",
      "/upload/h_100/"
    );
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  //let listing = await Listing.findById(id);
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};




