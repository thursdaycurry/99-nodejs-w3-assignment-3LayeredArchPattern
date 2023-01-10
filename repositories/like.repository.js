// Repository <-> DB

const { Posts, Likes, sequelize } = require('../models');

class LikeRepository {
  findPostByPostId = async (postId) => {
    const post = await Posts.findByPk(postId);

    return post;
  };

  findLike = async (postId, userId) => {
    const like = await Likes.findOne({
      where: {
        postId: postId,
        UserId: userId,
      },
    });
    return like;
  };

  createLike = async (postId, userId) => {
    await Likes.create({
      UserId: userId,
      PostId: postId,
      isLiked: 1,
    });
  };

  likeUp = async (postId, userId) => {
    await Likes.update(
      { isLiked: 1 },
      {
        where: {
          postId: postId,
          UserId: userId,
        },
      }
    );
  };

  likeDown = async (postId, userId) => {
    await Likes.update(
      { isLiked: 0 },
      {
        where: {
          postId: postId,
          UserId: userId,
        },
      }
    );
  };

  findLikedPosts = async (userId) => {
    const [result, metadata] = await sequelize.query(`
  select
    p.postId,
    u.name,
    p.title,
    l.createdAt as dateToLike,
    (select count(isLiked) from Likes where PostId = p.postId) as like_cnt
  from Likes l
  inner join Users u on l.UserId = u.userId
  inner join Posts p on l.PostId = p.postId
  where l.UserId = ${userId}
  order by like_cnt DESC
  `);

    return result;
  };
}
module.exports = LikeRepository;
