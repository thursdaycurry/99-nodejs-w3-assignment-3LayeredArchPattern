// repositories/posts.repository.js

const { Posts, sequelize } = require('../models');

class PostRepository {
  findAllPost = async () => {
    // const posts = await Posts.findAll();

    // return posts;

    const [result, metadata] = await sequelize.query(`
      SELECT 
        p.postId, 
        p.UserId, 
        u.name as nickname, 
        p.title, 
        p.createdAt, 
        p.updatedAt, 
        (select count(l.isLiked) from Likes l where l.postId = p.postId) as likes 
      FROM Posts p 
      INNER JOIN Users u ON p.UserId = u.userId
    `);
    return result;
  };

  findPostById = async (postId) => {
    const post = await Posts.findByPk(postId);
    return post;
  };

  createPost = async (title, content) => {
    try {
      await Posts.create({
        UserId: '1',
        title: title,
        content: content,
      });
    } catch (error) {
      console.log(`🧚🏼‍♀️ error: ${error}`);
    }
  };

  updatePost = async (postId, title, content) => {
    await Posts.update({ title, content }, { where: { postId } });

    // const updatePostData = await Posts.update({ title, content }, { where: { postId } });
    // return updatePostData;
  };

  deletePost = async (postId) => {
    const updatePostData = await Posts.destroy({ where: { postId } });

    // return updatePostData;
  };
}

module.exports = PostRepository;
