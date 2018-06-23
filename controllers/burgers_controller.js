

// Burger controller
// This file uses Sequelize to manage data manipulation for all http requests.
// Same file from last week, but with each route replaced with sequelize queries instead of ORM file references
var express = require("express");
var router = express.Router();

// grabbing our models
var db = require("../models");

// get route -> index
router.get("/", function(req, res) {
  // send us to the next get function instead.
  res.redirect("/burgers");
});

// get route, edited to match sequelize
router.get("/burgers", function(req, res) {
  // replace old function with sequelize function
  db.Burger.findAll({
    // include: [db.Customer],
    // // Here we specify we want to return our burgers in ordered by ascending burger_name
    // order: [
    //   ["burger_name", "ASC"]
    // ]
  })
  // use promise method to pass the burgers...
    .then(function(dbBurger) {
    // into the main index, updating the page
      var hbsObject = {
        burgers: dbBurger
      };
      console.log(hbsObject);
      return res.render("index", hbsObject);
    });
});


// post route to create burgers
router.post("/api/burgers/create", function(req, res) {
  // edited burger create to add in a burger_name
  db.Burger.create({
    burger_name: req.body.burger_name
  })
  // pass the result of our call
    .then(function(dbBurger) {
    // log the result to our terminal/bash window
      console.log(dbBurger);
      // redirect
      res.redirect("/");
    });
});


// put route to devour a burger
router.put("/api/burgers/update/:id", function(req, res) {
  // If we are given a customer, create the customer and give them this devoured burger
  if (req.body.customer) {
    db.Customer.create({
      customer: req.body.customer,
      BurgerId: req.body.burger_id
    })
      .then(function(dbCustomer) {
        return db.Burger.update({
          devoured: true
        }, {
          where: {
            id: req.params.id
          }
        });
      })
      .then(function(dbBurger) {
        res.redirect("/");
      });
  }
  // If we aren't given a customer, just update the burger to be devoured
  else {
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(function(dbBurger) {
        res.redirect("/");
      });
  }
});


// router.delete("/api/burgers/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//         res.redirect("/burgers");
//     //   res.status(200).end();
//     }
//   });
// });

module.exports = router;
