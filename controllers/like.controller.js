// Controller -> Service

const LikeService = require('../services/like.service');

class LikeController {
  likeService = new LikeService();

  likePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const userId = res.locals.userId;

      // postId 게시글 존재 여부 확인
      const postToLike = await this.likeService.findPostByPostId(postId);

      // # 404 게시글이 존재하지 않는경우
      if (!postToLike) return res.status(404).json({ errorMessage: '404, 좋아요 누를 게시글이 존재하지 않습니다.' });

      // 게시글 존재하는 경우, 좋아요 토글
      if (postToLike) {
        const likeResult = await this.likeService.likeToggle(postId, userId);
        return res.status(200).json({ message: likeResult });
      }
    } catch (error) {
      console.log(`🧡error: ${error}`);

      // # 400 예외 케이스에서 처리하지 못한 에러
      res.status(400).json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
    }
  };

  getLikedPosts = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const likedPosts = await this.likeService.findLikedPosts(userId);

      res.status(201).json({ data: likedPosts });
    } catch (error) {
      // # 400 예외 케이스에서 처리하지 못한 에러
      res.status(400).json({ errorMessage: '좋아요  조회에 실패했습니다.' });
    }
  };
}

module.exports = LikeController;
