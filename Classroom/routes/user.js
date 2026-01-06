const express = require("express");
const router = express.Router();

//index - users
router.get("/", (req, res) => {
    res.send("get for users");
});



//show -user
router.get("/:id", (req, res) => {
    res.send("get for users id");
});


//post - user
router.post("/", (req, res) => {
    res.send("Post for users");
});


//delete - user
router.delete("/:id", (req, res) => {
    res.send("delete for users id");
});


module.exports = router;