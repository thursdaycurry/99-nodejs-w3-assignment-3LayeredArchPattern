// Router -> Controller

const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controller');
const commentsController = new CommentsController();

// * DONE

// todo - wip
router.get('/:postId', commentsController.getComments); // READ all comments of the post
router.post('/:postId', commentsController.createComment); // CREATE comment into post

router.put('/:commentId', commentsController.updateComment); // UPDATE the comment

router.delete('/:commentId', commentsController.deleteComment); // DELETE the comment

module.exports = router;
