// Service -> Repository

const CommentRepository = require('../repositories/comments.repository.js');

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);
    return allComment;
  };

  isThisGuyCommentOwner = async (commentId, userId) => {
    const clientUserId = userId;
    const commentOwnerUserId = await this.commentRepository.findUserIdByCommentId(commentId);

    if (!commentOwnerUserId) {
      throw new Error('400, 해당 댓글을 찾을 수가 없습니다.');
    }

    console.log(`🛒clientUserId: ${clientUserId}`);
    console.log(`commentOwnerUserId: ${commentOwnerUserId['UserId']}`);

    return clientUserId === commentOwnerUserId['UserId'] ? true : false;
  };

  createComment = async (userId, postId, comment) => {
    await this.commentRepository.createComment(userId, postId, comment);
  };

  updateComment = async (commentId, comment) => {
    const findComment = await this.commentRepository.findCommentById(commentId);
    if (!findComment) throw new Error("Comment doesn't exist");

    await this.commentRepository.updateComment(commentId, comment);
  };

  deleteComment = async (commentId) => {
    const findComment = await this.commentRepository.findCommentById(commentId);
    if (!findComment) throw new Error("Comment doesn't exist");

    await this.commentRepository.deleteComment(commentId);
  };
}

module.exports = CommentService;
