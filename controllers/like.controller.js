// Controller -> Service

const LikeService = require('../services/like.service');

class LikeController {
  likeService = new LikeService();

  likePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const userId = res.locals.userId;

      const postToLike = await this.likeService.findPostByPostId(postId);
      if (!postToLike) return res.status(404).json({ errorMessage: '404, 좋아요 누를 게시글이 존재하지 않습니다.' });

      if (postToLike) {
        const likeResult = await this.likeService.likeToggle(postId, userId);
        return res.status(200).json({ message: likeResult });
      }
      res.status(400).json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
    } catch (error) {
      res.status(400).json({ errorMessage: '게시글 좋아요에 실패하였습니다.' });
    }
  };

  getLikedPosts = async (req, res, next) => {
    try {
      const userId = res.locals.userId;
      const likedPosts = await this.likeService.findLikedPosts(userId);
      return res.status(201).json({ data: likedPosts });
    } catch (error) {
      res.status(400).json({ errorMessage: '좋아요  조회에 실패했습니다.' });
    }
  };
}

module.exports = LikeController;
