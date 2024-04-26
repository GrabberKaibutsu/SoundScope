const express = require('express');
const Review = require('../models/review');  // Correct Path?
const router = express.Router();
// // Middleware to ensure the user is logged in
function ensureAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "You must be logged in to perform this action" });
  }
  next();
}
// POST a review
router.post('/:itemType/:itemId', ensureAuthenticated, async (req, res) => {
  try {
    const newReview = new Review({
      title: req.body.title,
      content: req.body.content,
      reviewedBy: req.session.user.id,  // Using the user id stored in the session
      reviewDate: Date.now()
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// // GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('reviewedBy', 'username');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a review
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    if (review.reviewedBy.toString() !== req.session.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await review.remove();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', (req, res) => {
  res.send("Reviews");
})
module.exports = router;