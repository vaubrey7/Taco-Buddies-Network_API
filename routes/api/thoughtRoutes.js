const router = require('express').Router();

const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtsController');

// Sets up get all and post for thoughts about Taco's 
router.route('/').get(getThoughts).post(createThought);

// Sets up get by id, put and delete for thoughts for when you regret endorsing THAT Taco
router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// Set up for Taco argument posts about reactions
router.route('/:thoughtsId/reactions').post(addReaction);

// Sets up delete for reactions for when you are too embarrassed and sad that that TACO got between you and your friend 
router.route('/:thoughtsId/reactions/:reactionId').delete(removeReaction);

module.exports = router;