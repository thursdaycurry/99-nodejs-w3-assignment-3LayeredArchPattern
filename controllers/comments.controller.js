// Controller -> Service

const CommentService = require('../services/comments.service');

class CommentsController {
  commentService = new CommentService();

  // * READ all comments of the post
  // - core func
  getComments = async (req, res, next) => {
    const { postId } = req.params;

    const comments = await this.commentService.findAllComment(postId);

    res.status(200).json({ data: comments });
  };

  // * CREATE comment
  // - core func
  // todo error handling
  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { comment } = req.body;
    await this.commentService.createComment(postId, comment);

    res.status(201).json({ message: '댓글 작성에 성공하였습니다.' });
  };

  // * UPDATE comment
  // - core func
  // todo error handling
  updateComment = async (req, res, next) => {
    const { commentId } = req.params;
    const { comment } = req.body;

    await this.commentService.updateComment(commentId, comment);

    res.status(200).json({ message: '댓글을 수정했습니다.' });
  };

  // * DELETE comment
  // todo core func
  // todo error handling
  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;

    await this.commentService.deleteComment(commentId);

    res.status(200).json({ message: '댓글을 삭제했습니다.' });
  };
}

module.exports = CommentsController;
