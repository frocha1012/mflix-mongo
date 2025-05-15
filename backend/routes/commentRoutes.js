const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.get('/:movieId', commentController.getComments);
router.post('/:movieId', commentController.addComment);
router.put('/edit/:commentId', commentController.updateComment);
router.delete('/delete/:commentId', commentController.deleteComment);

module.exports = router;