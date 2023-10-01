const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const Shop = require("../model/shop");
const { isAuthenticated, isShop } = require("../middleware/auth");
const { upload } = require("../multer");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const sendShopToken = require("../utils/shopToken");

// create shop
router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;
    const shopEmail = await Shop.findOne({ email });
    if (shopEmail) {
      const filename = req.file.filename;
      const filepath = `uploads/${filename}`;
      fs.unlink(filepath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("Shop already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const shop = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(shop);

    const activationUrl = `http://localhost:3000/shop/activation/${activationToken}`;

    try {
      await sendMail({
        email: shop.email,
        subject: "Activate your shop",
        message: `Hello ${shop.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${shop.email} to activate your shop`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler("Shop already exists", 400));
  }
});

// create the activation token
const createActivationToken = (shop) => {
  return jwt.sign(shop, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newShop = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      if (!newShop) {
        return next(new ErrorHandler("Invalid activation token", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newShop;

      let shop = await Shop.findOne({ email });

      if (shop) {
        return next(new ErrorHandler("Shop already exists", 400));
      }

      shop = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });
      sendShopToken(shop, 201, res);
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  })
);

// login shop
router.post(
  "/login-shop",
  catchAsyncError(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please fill all fields!", 400));
      }

      const shop = await Shop.findOne({ email }).select("+password");
      if (!shop) {
        return next(new ErrorHandler("shop doesn't exists!", 400));
      }

      const isPasswordValid = await shop.comparePassword(password);
      if (!isPasswordValid) {
        console.log(password === shop.password);
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(shop, 201, res);
    } catch (e) {
      return next(new ErrorHandler(e.message, 500));
    }
  })
);

// load shop
router.get(
  "/getShop",
  isShop,
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.shop._id);

      if (!shop) {
        return next(new ErrorHandler("Shop doesn't exists", 400));
      }

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out shop
router.get(
  "/logout",
  catchAsyncError(async (req, res, next) => {
    try {
      res.cookie("shop_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successfully",
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncError(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop profile picture
router.put(
  "/update-shop-avatar",
  isShop,
  upload.single("image"),
  catchAsyncError(async (req, res, next) => {
    try {
      const existsUser = await Shop.findById(req.shop._id);

      const existAvatarPath = `uploads/${existsUser.avatar}`;

      fs.unlinkSync(existAvatarPath);

      const fileUrl = path.join(req.file.filename);

      const shop = await Shop.findByIdAndUpdate(req.shop._id, {
        avatar: fileUrl,
      });

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop info
router.put(
  "/update-shop-info",
  isShop,
  catchAsyncError(async (req, res, next) => {
    try {
      const { name, description, address, phoneNumber, zipCode } = req.body;

      const shop = await Shop.findOne(req.shop._id);

      if (!shop) {
        return next(new ErrorHandler("User not found", 400));
      }

      shop.name = name;
      shop.description = description;
      shop.address = address;
      shop.phoneNumber = phoneNumber;
      shop.zipCode = zipCode;

      await shop.save();

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;
