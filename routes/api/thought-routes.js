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

// Sets up get all and post for thoughts about Taco's 
router.route('/').get(getAllThoughts).post(createThought);
// Sets up get by id, put and delete for thoughts for when you regret endorsing THAT Taco
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThought);
// Set up for argument posts about reactions
router.route('/:thoughtId/reactions').post(createReaction);
// Sets up delete for reactions for when you are too embarrassed and sad that TACO got came between you and your friend 
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;