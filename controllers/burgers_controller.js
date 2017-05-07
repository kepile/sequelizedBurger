var express = require("express");

var router = express.Router();
// Import the model (cat.js) to use its database functions.
// var db = require("../models/burger.js");
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  console.log("line 10 " + JSON.stringify(req.body));
   db.Burgers.findAll({})
   .then(function(data) {
    var burgerObject = {
      burgers: data
    };
    res.render("index", burgerObject );
  });
});

router.post("/", function(req, res) {
  console.log("post ************ " + JSON.stringify(req.body));
if (req.body.burger_name === "") {
  res.redirect("/");
} else 
{
    db.Burgers.create({
      burger_name: req.body.burger_name,
      devoured: false,
     })
      .then(function(dbBurgers) {
      res.redirect("/");
    });
  }
});

router.put("/all", function(req, res) {
    db.Burgers.update(req.body,
      {
        where: {
          devoured: true
        }
      })
    .then(function(dbBurgers) {
    res.redirect("/");
  });
});


router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  db.Burgers.update(req.body,
      {
        where: {
          id: req.params.id
        }
      })
    .then(function(dbBurgers) {
      var timer = setInterval(function(){ 
      clearInterval(timer);
      res.redirect("/"); 
    }, 1000);
    // res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;