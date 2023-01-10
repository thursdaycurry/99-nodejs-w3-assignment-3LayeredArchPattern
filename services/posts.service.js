// services/posts.services.js

const PostRepository = require('../repositories/posts.repository.js');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    const allPost = await this.postRepository.findAllPost();

    return allPost;
  };

  findPostById = async (postId) => {
    const findPost = await this.postRepository.findPostById(postId);

    return {
      postId: findPost.postId,
      nickname: findPost.nickname,
      title: findPost.title,
      content: findPost.content,
      createdAt: findPost.createdAt,
      updatedAt: findPost.updatedAt,
    };
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

  updatePost = async (postId, password, title, content) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.updatePost(postId, title, content);

    // const updatePost = await this.postRepository.findPostById(postId);

    // return {
    //   postId: updatePost.postId,
    //   nickname: updatePost.nickname,
    //   title: updatePost.title,
    //   content: updatePost.content,
    //   createdAt: updatePost.createdAt,
    //   updatedAt: updatePost.updatedAt,
    // };
  };

  deletePost = async (postId, password) => {
    const findPost = await this.postRepository.findPostById(postId);
    if (!findPost) throw new Error("Post doesn't exist");

    await this.postRepository.deletePost(postId, password);

    // return {
    //   postId: findPost.postId,
    //   nickname: findPost.nickname,
    //   title: findPost.title,
    //   content: findPost.content,
    //   createdAt: findPost.createdAt,
    //   updatedAt: findPost.updatedAt,
    // };
  };
}

module.exports = PostService;
