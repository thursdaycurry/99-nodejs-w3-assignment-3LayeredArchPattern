// Router -> Controller

const express = require('express');
const router = express.Router();

const SignupController = require('../controllers/signup.controller');
const signupController = new SignupController();

// todo - basic core func
// todo - error handling

router.post('/', signupController.signup); // Login

// router.get('/:postId', postsController.getPostById); // READ specific post
// router.post('/', postsController.createPost); // CREATE post
// router.put('/:postId', postsController.updatePost); // UPDATE post
// router.delete('/:postId', postsController.deletePost); // DELETE post

module.exports = router;
