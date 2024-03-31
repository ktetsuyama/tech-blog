const router = require('express').Router();
// Import the post and comment model from the models folder
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fething posts with comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    res.status(200).json(postData);
  } catch (error) {
    console.error('Error fething post with comments:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// If a POST request is made to /api/posts, a new post is created. If there is an error, the function returns with a 400 error.
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route to update the post

router.put('/:id', withAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const updatedPost = await post.update(req.body);

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// If a DELETE request is made to /api/posts/:id, that post is deleted.
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
