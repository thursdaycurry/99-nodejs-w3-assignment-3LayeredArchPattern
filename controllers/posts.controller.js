// Controller -> Service

const PostService = require('../services/posts.service');
const ValidateText = require('../helper/validate.text.js');

class PostsController {
  postService = new PostService();
  validateText = new ValidateText();

  // * READ all posts
  getPosts = async (req, res, next) => {
    const posts = await this.postService.findAllPost();
    return res.status(200).json({ data: posts });
  };

  // * READ specific posts
  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    if (post) return res.status(200).json({ data: post });

    // # 400 예외 케이스에서 처리하지 못한 에러
    return res.status(200).json({ errorMessage: '게시글 조회에 실패하였습니다.' });
  };

  // * CREATE post
  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;

      // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      if (Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });

      // # 412 Title의 형식이 비정상적인 경우
      if (!title) return res.status(400).json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });

      // # 412 Content의 형식이 비정상적인 경우
      if (!content) return res.status(400).json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });

      // # 412 title, content 5자 미만일 경우
      const validateResult = await this.validateText.validatePost(title, content);

      // 게시글 생성
      if (content && content) {
        await this.postService.createPost(title, content);
        return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
      }
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' });
    }
  };

  // * UPDATE post
  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

      // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      if (Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });

      // # 412 Title의 형식이 비정상적인 경우
      if (!title) return res.status(400).json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });

      // # 412 Content의 형식이 비정상적인 경우
      if (!content) return res.status(400).json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });

      // # 404 게시글이 없는 경우
      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      // todo 게시글 작성자와 유저가 동일한 경우 체크

      await this.postService.updatePost(postId, title, content);
      return res.status(200).json({ message: `게시글을 성공적으로 수정했습니다.` });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: '게시글 수정에 실패했습니다' });
    }
  };

  // * DELETE post
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      // // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      // if (Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });

      // // # 412 Title의 형식이 비정상적인 경우
      // if (!title) return res.status(400).json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });

      // // # 412 Content의 형식이 비정상적인 경우
      // if (!content) return res.status(400).json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });

      // # 404 게시글이 없는 경우
      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      // todo 게시글 작성자와 유저가 동일한 경우 체크

      await this.postService.deletePost(postId);

      res.status(200).json({ message: `게시글을 삭제했습니다.` });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: '게시글 삭제에 실패했습니다' });
    }
  };
}

module.exports = PostsController;
