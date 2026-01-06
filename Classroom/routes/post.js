const express = require("express");
const router = express.Router();



//index
router.get("/", (req, res) => {
    res.send("get for post");
});



//show
router.get("/:id", (req, res) => {
    res.send("get for Show post");
});


//post
router.post("/", (req, res) => {
    res.send("Post for post");
});


//delete
router.delete("/:id", (req, res) => {
    res.send("delete for post id");
});


module.exports = router;