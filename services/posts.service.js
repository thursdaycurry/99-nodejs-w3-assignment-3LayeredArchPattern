// services/posts.services.js

const PostRepository = require('../repositories/posts.repository.js');
const ValidateText = require('../helper/validate.text.js');

class PostService {
  postRepository = new PostRepository();
  validateText = new ValidateText();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();
    return allPost;
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);
    return findPost;
  };

  createPost = async (title, content) => {
    await this.postRepository.createPost(title, content);
    // const createPostData = await this.postRepository.createPost(title, content);

    // return {
    //   postId: createPostData.null,
    //   nickname: createPostData.nickname,
    //   title: createPostData.title,
    //   content: createPostData.content,
    //   createdAt: createPostData.createdAt,
    //   updatedAt: createPostData.updatedAt,
    // };
  };

  updatePost = async (postId, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");
    await this.postRepository.updatePost(postId, title, content);
  };

  deletePost = async (postId, password) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.deletePost(postId);
  };
}

module.exports = PostService;
