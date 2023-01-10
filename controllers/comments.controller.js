// Controller -> Service

const CommentService = require('../services/comments.service');
const PostService = require('../services/posts.service');

class CommentsController {
  commentService = new CommentService();
  postService = new PostService();

  // * READ all comments of the post
  // - core func
  getComments = async (req, res, next) => {
    const { postId } = req.params;
    const comments = await this.commentService.findAllComment(postId);
    res.status(200).json({ data: comments });
  };

  // * CREATE comment
  createComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { comment } = req.body;

      // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      if (Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });

      // # 412 comment의 형식이 비정상적인 경우
      if (!comment) return res.status(400).json({ errorMessage: '댓글의 형식이 일치하지 않습니다.' });

      // # 404 게시글이 없는 경우
      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      await this.commentService.createComment(postId, comment);

      res.status(201).json({ message: '댓글 작성에 성공하였습니다.' });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: '댓글 생성에 실패했습니다' });
    }
  };

  // * UPDATE comment
  updateComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;

      // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      if (Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });

      // # 412 comment의 형식이 비정상적인 경우
      if (!comment) return res.status(400).json({ errorMessage: '댓글의 형식이 일치하지 않습니다.' });

      // # 404 게시글이 없는 경우
      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      // todo 현재 유저와 댓글 작성자가 동일한지 확인

      await this.commentService.updateComment(commentId, comment);
      return res.status(200).json({ message: '댓글을 수정했습니다.' });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: '댓글 생성에 실패했습니다' });
    }
  };

  // * DELETE comment

  deleteComment = async (req, res, next) => {
    const { commentId } = req.params;

    await this.commentService.deleteComment(commentId);

    res.status(200).json({ message: '댓글을 삭제했습니다.' });
  };
}

module.exports = CommentsController;
