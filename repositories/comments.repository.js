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

  createComment = async (postId, comment) => {
    await Comments.create({
      UserId: '1', // dummy
      PostId: postId,
      comment: comment,
    });
  };

  updateComment = async (commentId, comment) => {
    await Comments.update({ comment }, { where: { commentId } });

    // const updatePostData = await Posts.update({ title, content }, { where: { postId } });
    // return updatePostData;
  };

  deleteComment = async (commentId) => {
    await Comments.destroy({ where: { commentId } });
  };
}

module.exports = CommentRepository;
