// Service -> Repository

const CommentRepository = require('../repositories/comments.repository.js');

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);

    return allComment;
    // allComment.sort((a, b) => {
    //   return b.createdAt - a.createdAt;
    // });

    // return allComment.map((post) => {
    //   return {
    //     postId: post.postId,
    //     nickname: post.nickname,
    //     title: post.title,
    //     createdAt: post.createdAt,
    //     updatedAt: post.updatedAt,
    //   };
    // });
  };

  // findPostById = async (postId) => {
  //   const findPost = await this.commentRepository.findPostById(postId);

  //   return {
  //     postId: findPost.postId,
  //     nickname: findPost.nickname,
  //     title: findPost.title,
  //     content: findPost.content,
  //     createdAt: findPost.createdAt,
  //     updatedAt: findPost.updatedAt,
  //   };
  // };

  createComment = async (postId, comment) => {
    await this.commentRepository.createComment(postId, comment);

    // const createPostData = await this.commentRepository.createPost(title, content);

    // return {
    //   postId: createPostData.null,
    //   nickname: createPostData.nickname,
    //   title: createPostData.title,
    //   content: createPostData.content,
    //   createdAt: createPostData.createdAt,
    //   updatedAt: createPostData.updatedAt,
    // };
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
