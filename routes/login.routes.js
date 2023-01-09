// Router -> Controller

const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/login.controller');
const loginController = new LoginController();

// todo - basic core func
// todo - error handling

router.post('/', loginController.login); // Login

// router.get('/:postId', postsController.getPostById); // READ specific post
// router.post('/', postsController.createPost); // CREATE post
// router.put('/:postId', postsController.updatePost); // UPDATE post
// router.delete('/:postId', postsController.deletePost); // DELETE post

module.exports = router;
