// Dependencies
var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    burgers.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});


router.post("/burgers", function (req, res) {
    burgers.insertOne([
        "burger_name"
    ], [
            req.body.burger_name
        ], function (result) {
            // Send back the ID of the new quote
            res.redirect("/");
            // res.json({ id: result.insertId }); - from catsApp

        });
});

router.put("/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burgers.updateOne({
        "devoured": true
    }, condition, function (data) {
        res.redirect("/")
    });
});

// Export routes for server.js to use.
module.exports = router;
