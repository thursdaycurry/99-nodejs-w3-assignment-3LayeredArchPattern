const { Comments, sequelize } = require('../models');

class CommentRepository {
  findAllComment = async (postId) => {
    const comments = await Comments.findAll({
      where: { PostId: postId },
      order: sequelize.literal('createdAt DESC'),
    });
    return comments;
  };

  findCommentById = async (commentId) => {
    const comment = await Comments.findByPk(commentId);
    return comment;
  };

  findUserIdByCommentId = async (commentId) => {
    const result = await Comments.findOne({ where: { commentId } });
    return result;
  };

  createComment = async (userId, postId, comment) => {
    await Comments.create({
      UserId: userId,
      PostId: postId,
      comment: comment,
    });
  };

  updateComment = async (commentId, comment) => {
    await Comments.update({ comment }, { where: { commentId } });
  };

  deleteComment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });
  };
}

module.exports = CommentRepository;
