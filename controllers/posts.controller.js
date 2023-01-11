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
      return res.status(200).json({ errorMessage: '게시글 조회에 실패하였습니다.' }); // # 400 예외 케이스에서 처리하지 못한 에러
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);
      if (post) return res.status(200).json({ data: post });
    } catch (error) {
      return res.status(200).json({ errorMessage: '게시글 조회에 실패하였습니다.' }); // # 400 예외 케이스에서 처리하지 못한 에러
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      this.validateForm.body(req.body); // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      this.validateForm.title(title); // # 412 Title의 형식이 비정상적인 경우
      this.validateForm.content(content); // # 412 Content의 형식이 비정상적인 경우
      this.validateText.validatePost(title, content); // # 412 title, content 5자 미만일 경우

      // 게시글 생성
      if (content && content) {
        await this.postService.createPost(title, content);
        return res.status(201).json({ message: '게시글 작성에 성공하였습니다.' });
      }
    } catch (error) {
      return res.status(400).json({ errorMessage: '게시글 작성에 실패하였습니다.' }); // # 400 예외 케이스에서 처리하지 못한 에러
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;

      console.log(`🧡res.locals.userId: ${res.locals.userId}`);
      console.log(`🧡res.locals.nickname: ${res.locals.nickname}`);

      this.validateForm.body(req.body); // # 412 body 데이터가 정상적으로 전달되지 않는 경우
      this.validateForm.title(title); // # 412 Title의 형식이 비정상적인 경우
      this.validateForm.content(content); // # 412 Content의 형식이 비정상적인 경우
      this.validateText.validatePost(title, content); // # 412 title, content 5자 미만일 경우

      // # 404 게시글이 없는 경우
      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      // todo 게시글 작성자와 유저가 동일한 경우 체크
      // 유저 아이디
      const valResult = await this.postService.isThisGuyPostOwner(postId, res.locals.userId);
      console.log(`🧚🏼‍♀️res.locals.userId: ${res.locals.userId}`);
      console.log(`valResult: ${valResult}`);

      await this.postService.updatePost(postId, title, content);
      return res.status(200).json({ message: `게시글을 성공적으로 수정했습니다.` });
    } catch (error) {
      console.log(`🐞error: ${error}`);
      return res.status(400).json({ errorMessage: '게시글 수정에 실패했습니다' }); // # 400 예외 케이스에서 처리하지 못한 에러
    }
  };

  // * DELETE post
  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;

      // # 404 게시글이 없는 경우
      const post = await this.postService.findPostById(postId);
      if (!post) return res.status(404).json({ errorMessage: '게시글이 존재하지 않습니다.' });

      // todo 게시글 작성자와 유저가 동일한 경우 체크

      await this.postService.deletePost(postId);

      return res.status(200).json({ message: `게시글을 삭제했습니다.` });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      return res.status(400).json({ errorMessage: '게시글 삭제에 실패했습니다' });
    }
  };
}

module.exports = PostsController;

// console.log(`🐞 Object.keys(req.body): ${Object.keys(req.body)}`);
// console.log(`🐞 Object.keys(req.body).length: ${Object.keys(req.body).length}`);

// // # 412 body 데이터가 정상적으로 전달되지 않는 경우
// if (Object.keys(req.body).length === 0) return res.status(400).json({ errorMessage: '데이터 형식이 올바르지 않습니다.' });

// if (!title) return res.status(400).json({ errorMessage: '게시글 제목의 형식이 일치하지 않습니다.' });

// # 412 Content의 형식이 비정상적인 경우
// if (!content) return res.status(400).json({ errorMessage: '게시글 내용의 형식이 일치하지 않습니다.' });
