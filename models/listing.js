const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema =  new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String, 
        required: true,
    },

    image: {
        type: String,
        default: "https://www.istockphoto.com/photo/scenic-view-of-sea-against-sky-during-sunset-gm2169998845-589952675?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fbeach-sunset&utm_medium=affiliate&utm_source=unsplash&utm_term=beach+sunset%3A%3A%3A",
        set: (v) => v === ""? "https://www.istockphoto.com/photo/scenic-view-of-sea-against-sky-during-sunset-gm2169998845-589952675?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Fbeach-sunset&utm_medium=affiliate&utm_source=unsplash&utm_term=beach+sunset%3A%3A%3A": v, //arrow function: if the value of v is an empty string, then we'll assigne a link; otherwise, we"ll keep its original value.
    },
    price: Number,
    location: String,
    country: String, 
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});

    }    
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;