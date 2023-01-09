// Router -> Controller

const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/', postsController.getPosts); // READ all posts
router.get('/:postId', postsController.getPostById); // READ specific post
router.post('/', postsController.createPost); // CREATE post
router.put('/:postId', postsController.updatePost); // UPDATE post
router.delete('/:postId', postsController.deletePost);

module.exports = router;
