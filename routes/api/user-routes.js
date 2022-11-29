const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// Sets up get all and posts for users for when you wanna know who supported THAT taco.. so you can Taco shame them. 
router.route('/').get(getAllUsers).post(createUser);
// Sets up get by id, put and delete for users for when that Taco comment was just fire. 
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
// Sets up post and delete for friends.. because that Taco came between you too. 
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;