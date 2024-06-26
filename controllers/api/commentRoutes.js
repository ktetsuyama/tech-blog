const router = require('express').Router();
// Import the post model from the models folder
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// If a POST request is made to /api/comment, a new comment is created. If there is an error, the function returns with a 400 error.
router.post('/api/post/:id/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
