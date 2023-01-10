// Service -> Repository

const LikeRepository = require('../repositories/like.repository');

class LikeService {
  likeRepository = new LikeRepository();

  findPostByPostId = async (postId) => {
    const post = await this.likeRepository.findPostByPostId(postId);
    return post;
  };

  likeToggle = async (postId, userId) => {
    let message = '';

    // 해당 postId에 대한 라이크 데이터 있는가?
    const like = await this.likeRepository.findLike(postId, userId);

    console.log(`🧡like: ${JSON.stringify(like)}`);
    // 좋아요 처음 누르는 경우
    if (!like) await this.likeRepository.createLike(postId, userId);

    if (like['isLiked']) {
      await this.likeRepository.likeDown(postId, userId);
      message = '좋아요를 취소했습니다';
    } else {
      await this.likeRepository.likeUp(postId, userId);
      message = '좋아요를 생성했습니다';
    }

    return message;
  };

  findLikedPosts = async (userId) => {
    const likedPosts = await this.likeRepository.findLikedPosts(userId);

    return likedPosts;
  };
}

module.exports = LikeService;
