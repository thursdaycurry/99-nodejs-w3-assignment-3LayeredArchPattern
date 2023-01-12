// Controller -> Service

const PostService = require('../services/posts.service');
const ValidateText = require('../helper/validate.text.js');
const ValidateForm = require('../helper/validate.form.js');

class PostsController {
  postService = new PostService();
  validateText = new ValidateText();
  validateForm = new ValidateForm();

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.findAllPost();
      return res.status(200).json({ data: posts });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);
      if (post) {
        return res.status(200).json({ data: post });
      }
      return res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const userId = res.locals.userId;
      console.log(`🚀userId: ${userId}`);

      this.validateForm.body(req.body);
      this.validateForm.title(title);
      this.validateForm.content(content);
      this.validateText.validatePost(title, content);

      if (content && content) {
        await this.postService.createPost(userId, title, content);
        return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
      }
      return res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

      this.validateForm.body(req.body);
      this.validateForm.title(title);
      this.validateForm.content(content);
      this.validateText.validatePost(title, content);

      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const compareTwoUsers = await this.postService.isThisGuyPostOwner(postId, res.locals.userId);
      if (compareTwoUsers) {
        await this.postService.updatePost(postId, title, content);
        return res.status(200).json({ message: `게시글을 성공적으로 수정했습니다.` });
      }

      return res.status(400).json({ errorMessage: '유저님이 쓴 글만 수정할 수 있습니다.' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 수정에 실패했습니다' });
    }
  };

  // * DELETE post
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      const compareTwoUsers = await this.postService.isThisGuyPostOwner(postId, res.locals.userId);
      if (compareTwoUsers) {
        await this.postService.deletePost(postId);
        return res.status(200).json({ message: `게시글을 성공적으로 삭제했습니다.` });
      }
      return res.status(400).json({ errorMessage: '유저님이 쓴 글만 삭제할 수 있습니다' });
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 삭제에 실패했습니다' });
    }
  };
}

module.exports = PostsController;
