const express = require("express");
const router = express.Router();

const {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
  getFoodDetails,
  getFoodReviews,
  deleteReview,
  createFoodReview,
  getAllFoodsAdmin,
} = require("../controller/foodController");
const { isAuthentictedUser, authorizeRoles } = require("../middleWare/auth");

router.route("/food").get(getAllFoods);
router
  .route("/admin/food/new")
  .post(isAuthentictedUser, authorizeRoles("admin"), createFood);
router
  .route("/admin/foods")
  .get( getAllFoodsAdmin);
router
  .route("/admin/food/:id")
  .put(isAuthentictedUser, authorizeRoles("admin"), updateFood)
  .delete(isAuthentictedUser, authorizeRoles("admin"), deleteFood);
router.route("/food/:id").get(getFoodDetails);
router.route("/review/new").put(isAuthentictedUser, createFoodReview);
router.route("/reviews").get(getFoodReviews);
router
  .route("/food/reviews/delete")
  .delete(isAuthentictedUser, authorizeRoles("admin"), deleteReview);

module.exports = router;
