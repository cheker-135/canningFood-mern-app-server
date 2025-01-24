const FoodModel = require("../model/foodModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// >>>>>>>>>>>>>>>>>>>>> createFood Admin route  >>>>>>>>>>>>>>>>>>>>>>>>
exports.createFood = asyncWrapper(async (req, res) => {
  let images = []; 

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    const chunkSize = 3;
    const imageChunks = [];
    while (images.length > 0) {
      imageChunks.push(images.splice(0, chunkSize));
    }

    for (let chunk of imageChunks) {
      const uploadPromises = chunk.map((img) =>
        cloudinary.v2.uploader.upload(img, {
          folder: "Foods",
        })
      );

      const results = await Promise.all(uploadPromises);

      for (let result of results) { 
        imagesLinks.push({
          food_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    req.body.user = req.user.id;
    req.body.images = imagesLinks;
  }

  const data = await FoodModel.create(req.body);

  res.status(200).json({ success: true, data: data });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all food >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllFoods = asyncWrapper(async (req, res) => {
  const resultPerPage = 6; 
  const foodsCount = await FoodModel.countDocuments(); 

  const apiFeature = new ApiFeatures(FoodModel.find(), req.query)
    .search()
    .filter();

  let foods = await apiFeature.query;

  let filteredFoodCount = foods.length;

  apiFeature.Pagination(resultPerPage);

  foods = await apiFeature.query.clone();

  res.status(201).json({
    success: true,
    foods: foods,
    foodsCount: foodsCount,
    resultPerPage: resultPerPage,
    filteredFoodCount: filteredFoodCount,
  });
});

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> get all food admin route >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getAllFoodsAdmin = asyncWrapper(async (req, res) => {
  const foods = await FoodModel.find();

  res.status(201).json({  
    success: true,
    foods,
  });
});

//>>>>>>>>>>>>>>>>>> Update Admin Route >>>>>>>>>>>>>>>>>>>>>>>
exports.updateFood = asyncWrapper(async (req, res, next) => {
  let food = await FoodModel.findById(req.params.id);

  if (!food) {
    return next(new ErrorHandler("Food not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < food.images.length; i++) {
      await cloudinary.v2.uploader.destroy(food.images[i].food_id);
    }

    const imagesLinks = [];
    for (let img of images) {
      const result = await cloudinary.v2.uploader.upload(img, {
        folder: "Foods",
      });

      imagesLinks.push({
        food_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  food = await FoodModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({
    success: true,
    food: food,
  });
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  delete food --admin  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.deleteFood = asyncWrapper(async (req, res, next) => {
 
  let food = await FoodModel.findById(req.params.id);

  if (!food) {
    return next(new ErrorHandler("Food not found", 404));
  }

  for (let i = 0; i < food.images.length; i++) {
    await cloudinary.v2.uploader.destroy(food.images[i].food_id);
  }

  await food.remove();

  res.status(201).json({
    success: true,
    message: "Food deleted successfully",
  });
});

//>>>>>>>>>>>>>>>>>>>>>>> Details of food >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.getFoodDetails = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;

  const food = await FoodModel.findById(id);
  if (!food) {
    return next(new ErrorHandler("Food not found", 404));
  }
  res.status(201).json({
    succes: true,
    food: food,
  });
});

//>>>>>>>>>>>>> Create New Review or Update the review >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.createFoodReview = asyncWrapper(async (req, res, next) => {
  const { ratings, comment, foodId, title, recommend } = req.body;
  const review = {
    userId: req.user._id,
    name: req.user.name,
    ratings: Number(ratings),
    title: title,
    comment: comment,
    recommend: recommend,
    avatar: req.user.avatar.url,
  };

  const food = await FoodModel.findById(foodId);

  const isReviewed = food.reviews.find((rev) => {
    return rev.userId.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    food.reviews.forEach((rev) => {
      if (rev.userId.toString() === req.user._id.toString()) {
        rev.ratings = ratings;
        rev.comment = comment;
        rev.recommend = recommend;
        rev.title = title;
        food.numOfReviews = food.reviews.length;
      }
    });
  } else {
    food.reviews.push(review);
    food.numOfReviews = food.reviews.length;
  }

  let totalRatings = 0;
  food.reviews.forEach((rev) => {
    totalRatings += rev.ratings;
  });
  food.ratings = totalRatings / food.reviews.length;

  await food.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// >>>>>>>>>>>>>>>>>>>>>> Get All Reviews of a food >>>>>>>>>>>>>>>>>>>>>>>>>
exports.getFoodReviews = asyncWrapper(async (req, res, next) => {
  const food = await FoodModel.findById(req.query.id);

  if (!food) {
    return next(new ErrorHandler("Food not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: food.reviews,
  });
});

//>>>>>>>>>>>>>>>>>>>>>> delete review >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
exports.deleteReview = asyncWrapper(async (req, res, next) => {
  const food = await FoodModel.findById(req.query.foodId);

  if (!food) {
    return next(new ErrorHandler("Food not found", 404)); 
  }

  const reviews = food.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.ratings;
  });

  let ratings = reviews.length === 0 ? 0 : avg / reviews.length;
  const numOfReviews = reviews.length;

  await FoodModel.findByIdAndUpdate(
    req.query.foodId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
