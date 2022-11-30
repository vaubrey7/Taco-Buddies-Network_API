const { Thoughts, Users } = require('../models');

const usersController = {

    // get all users TACO COMMUNITY!
    getUsers(req, res) {
        Users.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // get a single user by ID
    getSingleUser(req, res) {
        Users.findOne({ _id: req.params.userId })
            .select('-__v')
            .then((user) => 
                !user
                    ? res.status(404).json({ message: 'WARNING WILL ROBINSON No user with that ID'})
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create a new user Cause Signing up to talk about Tacos is Awesome! 
    createUser(req, res) {
        Users.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // update a single user by ID cause your old user ID is no longer tollerated by the taco community
    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            {
                new: true,
                runValidators: true,
            }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'WARNING WILL ROBINSON No user with this ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // delete a single user by ID
    deleteUser(req, res) {
        Users.findOneAndDelete(
            { _id: req.params.userId }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'WARNING WILL ROBINSON No use r with this ID!' })
                // delete the user's thoughts bacause your embarassed abour your public remarks about a certain TACO
                : Thoughts.deleteMany(
                    { _id: { $in: user.thoughts } }
                )
        )
        .then(() => res.json({ message: 'User and thoughts deleted!' }))
        .catch((err) => res.status(500).json(err));
    },

    // add a new friend because you share similar taste in Tacos
    addFriend(req, res) {
        Users.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'WARNING WILL ROBINSON No user with this ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    // remove a friend because you know.. he endorsed THAT Taco 
    removeFriend(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'WARNING WILL ROBINSON No user with this ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = usersController;