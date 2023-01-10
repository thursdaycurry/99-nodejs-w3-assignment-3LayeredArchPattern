// Service -> Repository

const PostRepository = require('../repositories/posts.repository.js');
const ValidateText = require('../helper/validate.text.js');

class PostService {
  postRepository = new PostRepository();
  validateText = new ValidateText();

  findAllPost = async () => {
    return await this.postRepository.findAllPost();
  };

  findPostById = async (postId) => {
    return await this.postRepository.findPostById(postId);
  };

  createPost = async (title, content) => {
    await this.postRepository.createPost(title, content);
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
