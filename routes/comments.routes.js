const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifytoken');

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

// * DONE

// todo - wip
router.get('/:postId', commentsController.getComments); // READ all comments of the post

router.post('/:postId', verifyToken, commentsController.createComment); // CREATE comment into post

router.put('/:commentId', verifyToken, commentsController.updateComment); // UPDATE the comment

router.delete('/:commentId', verifyToken, commentsController.deleteComment); // DELETE the comment

module.exports = router;
