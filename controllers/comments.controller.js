// Controller -> Service

const CommentService = require('../services/comments.service');
const PostService = require('../services/posts.service');

const ValidateForm = require('../helper/validate.form.js');

class CommentsController {
  commentService = new CommentService();
  postService = new PostService();
  validateForm = new ValidateForm();

  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const comments = await this.commentService.findAllComment(postId);
      return res.status(200).json({ data: comments });
    } catch (error) {
      return res.status(400).json({ errorMessage: '댓글 조회에 실패했습니다' });
    }
  };

  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { comment } = req.body;
      const userId = res.locals.userId;

      this.validateForm.body(req.body);
      this.validateForm.content(comment);

      const post = await this.postService.findPostById(postId);
      if (post) {
        await this.commentService.createComment(userId, postId, comment);
        return res.status(201).json({ message: '댓글 작성에 성공하였습니다.' });
      }
      return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '댓글 생성에 실패했습니다' });
    }
  };

  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;

      this.validateForm.content(comment);
      const valResult = await this.commentService.isThisGuyCommentOwner(commentId, res.locals.userId);

      if (valResult) {
        await this.commentService.updateComment(commentId, comment);
        return res.status(200).json({ message: '댓글을 수정했습니다.' });
      }
      return res.status(404).json({ errorMessage: '당신의 댓글만 수정할 수 있습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '댓글 수정에 실패했습니다' });
    }
  };

  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const userId = res.locals.userId;

      const valResult = await this.commentService.isThisGuyCommentOwner(commentId, userId);
      if (valResult) {
        await this.commentService.deleteComment(commentId);
        return res.status(200).json({ message: '댓글을 삭제했습니다.' });
      }
      return res.status(404).json({ errorMessage: '당신의 댓글만 삭제할 수 있습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: error.message });
    }
  };
}

module.exports = CommentsController;
