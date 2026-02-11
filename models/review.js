 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;


//create a review schema 
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
}); 
 

//create a model using the schema
module.exports =  mongoose.model("Review", reviewSchema);

//const review = mongoose.model("reviews", reviewSchema);