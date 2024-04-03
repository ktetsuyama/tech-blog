const { Post, User, Comment } = require('../models');

async function getPostById(id) {
  try {
    const postData = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['name', 'id'],
          },
        },
      ],
    });

    if (!postData) {
      throw new Error('Post not found');
    }

    return postData.get({ plain: true });
  } catch (err) {
    throw err;
  }
}

module.exports = { getPostById };
