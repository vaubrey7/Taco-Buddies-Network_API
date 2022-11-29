const { users, thoughts } = require('../models');

// get all users
const usersController = {
    getAllUsers(req, res) {
        users.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // get user by id
    getUserById({ params }, res) {
        users.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends', 
            select: '-__v'
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'WARNING WILL ROBINSON No user with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
// create user
    createUser({ body },res) {
        users.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'WARNING WILL ROBINSON No user with this ID' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
// delete User by id 
    deleteUser({ params }, res) {
            users.findOneAndDelete({ _id: params.id })
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'WARNING WILL ROBINSON No user found with this ID' });
                  return;
                }
                thoughts.deleteMany({ _id: { $in: dbUserData.thoughts }})
            }).then(()=> {
                res.json({ message: 'WARNING WILL ROBINSON I Deleted user and all thoughts' }); 
            }) 
        .catch(err => res.json(err));
    },
// add friend by id 
    addFriend({ params }, res) {
        users.findOneAndUpdate({ _id: params.userId }, { $push: { friends: params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'WARNING WILL ROBINSON No user found with this ID' });
              return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },
    // delete friend by id
    deleteFriend({ params }, res) {
        users.findOneAndUpdate({ _id: params.userId }, { $pull: { friends: params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: 'WARNING WILL ROBINSON No user found with this ID' });
              return;
            }
            res.json(dbUserData);
          })
          .catch((err) => res.status(400).json(err));
      }
};

module.exports = usersController;