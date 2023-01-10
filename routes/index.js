const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');
const likesRouter = require('./likes.routes');
const signupRouter = require('./signup.routes');
const loginRouter = require('./login.routes');

router.use('/posts/', postsRouter);
router.use('/comments', commentsRouter);
router.use('/like', likesRouter);
router.use('/signup', signupRouter);
router.use('/login', loginRouter);

module.exports = router;
