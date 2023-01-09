// controllers/posts.controller.js

// todo JWT

const PostService = require('../services/posts.service');

class PostsController {
  postService = new PostService();

  // * READ all posts
  // - core func
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();

    res.status(200).json({ data: posts });
  };

  // * READ specific posts
  // - core func
  // todo error handling
  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  // * CREATE post
  // - core func
  // todo error handling
  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    await this.postService.createPost(title, content);

    res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
  };

  // * UPDATE post
  // - core func
  // todo error handling
  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;

    const updatePost = await this.postService.updatePost(postId, title, content);

    res.status(200).json({ message: '게시글을 수정했습니다.' });
  };

  // * DELETE post
  // - core func
  // todo error handling
  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    // const { password } = req.body;

    const deletePost = await this.postService.deletePost(postId);

    res.status(200).json({ data: deletePost });
  };
}

module.exports = PostsController;
