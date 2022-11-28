const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Set up get all and post for thoughts
router.route('/').get(getAllThoughts).post(createThought);
// Set up get by id, put and delete for thoughts
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
// Set up post for reactions
router.route('/:thoughtId/reactions').post(createReaction);
// Set up delete for reactions
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;