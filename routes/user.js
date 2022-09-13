const express = require("express");
const router = express.Router();
const userController = require("../controller/user");

// axios get data pokeapi
router.get("/", userController.index);
router.get("/about", userController.about);

// CREATE & SHOW ALL
router.route("/user")
      .post(userController.create)
      .get(userController.showAll);

// SHOW ID
router.get("/user/:id", userController.showId);
// UPDATE
router.put("/user/:id", userController.update);
// DELETE
router.delete("/user/:id", userController.delete);

// Handle page not found
router.use("/", (req, res, err) => {
  res.status(404);
  res.send(`Error ${req.statusCode} page not found`);
  console.log(req);
});

module.exports = router;
