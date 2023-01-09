// Router -> Controller

const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

// * DONE

// todo - wip
router.get('/', postsController.getPosts); // READ all posts

// todo - to be done
router.get('/:postId', postsController.getPostById); // READ specific post
router.post('/', postsController.createPost); // CREATE post
router.put('/:postId', postsController.updatePost); // UPDATE post
router.delete('/:postId', postsController.deletePost); // DELETE post

module.exports = router;
