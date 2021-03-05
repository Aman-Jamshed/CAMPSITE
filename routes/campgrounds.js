
const express = require('express');
const catchAsync = require('../utils/catchAsync')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const campground = require('../models/campground');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,catchAsync(campgrounds.creteCampground))
    

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')    
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEdit));



module.exports = router;