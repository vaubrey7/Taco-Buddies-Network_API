const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/usersController');

// Sets up get users or create user for when you wanna know who supported THAT taco.. so you can Taco shame them.
router.route('/').get(getUsers).post(createUser);

// Sets up get by id, put and delete for users for when that Taco was just fire. 
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// Sets up post and delete for friends.. because that Taco came between you  
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend)

module.exports = router;