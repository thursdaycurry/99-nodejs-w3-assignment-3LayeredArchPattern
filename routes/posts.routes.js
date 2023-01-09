const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts.controller');

router.get('/', postsController.getPosts); // READ all posts
router.get('/');
