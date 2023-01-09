const express = require('express');
const router = express.Router();

const postsRouter = require('./posts.routes');
const commentsRouter = require('./comments.routes');
// const signupRouter = require('./signup');
// const loginRouter = require('./login');
// const likesRouter = require('./likes');

router.use('/posts/', postsRouter);
router.use('/comments', commentsRouter);
// router.use('/api', signupRouter);
// router.use('/api', loginRouter);
// router.use('/api', likesRouter);

module.exports = router;
