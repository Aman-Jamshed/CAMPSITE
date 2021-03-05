const campground = require('../models/campground');
const Review = require('../models/review');

module.exports.createReview = async(req, res) => {
    const camp_ground = await campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp_ground.reviews.push(review);
    await review.save();
    await camp_ground.save();
    req.flash('success', 'Created new review')
    res.redirect(`/campgrounds/${camp_ground._id}`);
};

module.exports.deleteReview = async(req, res) => {
    const { id, reviewId }= req.params;
    await campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
   res.redirect(`/campgrounds/${id}`);
};