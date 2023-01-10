// Router -> Controller

const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifytoken');

const LikeController = require('../controllers/like.controller');
const likeController = new LikeController();

router.get('/', verifyToken, likeController.getLikedPosts);
router.put('/:postId', verifyToken, likeController.likePost);

module.exports = router;
