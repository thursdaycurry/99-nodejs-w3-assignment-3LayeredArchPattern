const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifytoken');

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts); // READ all posts
router.get('/:postId', postsController.getPostById); // READ specific post

router.post('/', verifyToken, postsController.createPost); // CREATE post
router.put('/:postId', verifyToken, postsController.updatePost); // UPDATE post
router.delete('/:postId', verifyToken, postsController.deletePost); // DELETE post

module.exports = router;
