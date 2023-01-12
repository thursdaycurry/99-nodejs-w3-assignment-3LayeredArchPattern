//Repository <-> DB

const { Posts, sequelize } = require('../models');

class PostRepository {
  findAllPost = async () => {
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
      ORDER BY p.createdAt DESC
    `);
    return result;
  };

  findPostById = async (postId) => {
    console.log(`😀postId: `, postId);
    const result = await Posts.findOne({ where: { postId: postId } });
    return result;
  };

  findUserIdById = async (postId) => {
    const result = await Posts.findOne({ where: { postId: postId } });
    return result;
  };

  createPost = async (userId, title, content) => {
    await Posts.create({ UserId: userId, title: title, content: content });
  };

  updatePost = async (postId, title, content) => {
    await Posts.update({ title, content }, { where: { postId: postId } });
  };

  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });
  };
}

module.exports = PostRepository;
