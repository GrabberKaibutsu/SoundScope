const express = require('express');
const Review = require('../models/review');  // Correct Path?
const router = express.Router();
// // Middleware to ensure the user is logged in
const jwt = require('jsonwebtoken');
const db = require("../models");

// Middleware function to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, 'secret', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.user = decoded; // Attach user information to the request object
//     next();
//   });
// };

// function ensureAuthenticated(req, res, next) {
//   if (!req.session.user) {
//     return res.status(401).json({ message: "You must be logged in to perform this action" });
//   }
//   next();
// }

// // POST a review
// router.post('/:itemType/:itemId', async (req, res) => {
//   try {
//     const newReview = new Review({
//       title: req.body.title,
//       content: req.body.content,
//       reviewedBy: req.session.user.id,  // Using the user id stored in the session
//       reviewDate: Date.now()
//     });
//     await newReview.save();
//     res.status(201).json(newReview);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// // GET all reviews
router.get('/:albumId', async (req, res) => {
  try {
    let albumNum = req.params.albumId 
    const reviews = await db.Review.find({ reviewedBy: albumNum })
    res.send(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to add a comment for an album
router.post('/albums/:albumId/:userId/comments',  async (req, res) => {

    const content = req.body;
    const albumId = req.params.albumId;
    const userId = req.params.userId; // Assuming you have a middleware to extract userId from the authenticated user

    // Validate request body
    if (!userId || !content) {
      return res.status(400).json({ message: 'User ID and content are required' });
    }

    // Validate request body
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Create a new review instance
  const newReview = new Review({
  reviewedBy: userId,
  itemId: albumId,
  content: content
  });

  // Save the new review to the database
  newReview.save()
  .then(savedReview => {
    console.log('Review saved successfully:', savedReview);
    res.json(savedReview); // Send the saved review as a response
  })
  .catch(error => {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Internal server error' }); // Handle error
  });
});

// DELETE a review
router.delete('/:id', async (req, res) => {
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