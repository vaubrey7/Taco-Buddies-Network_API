const { Thoughts, Users } = require('../models');

const thoughtsController = {

   // get all thoughts so you can peruse the taco threads
    getThoughts(req, res) {
        Thoughts.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // get a single thought by id
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID!' })
                    : res.json(thought)
            )
    },

   //create a thought cause you gotta share the latest Taco news
    createThought(req, res) {
        Thoughts.create(req.body)
            .then((thought) => {
                return Users.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            })
            .then((thought) =>
                !thought
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID!',
                    })
                    : res.json('Created the new thought!')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update thought by id cause you know opinions can change.  
    updateThought(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            {
                runValidators: true,
                new: true,
            }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!'})
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
// delete thought by id because your embarassed you ever said that.. too much tequila with that Taco if you know what I mean. never drink and taco thread. 
     deleteThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!'})
                    : Users.findOneAndUpdate(
                        { thoughts: req.params.thoughtsId },
                        { $pull: { thoughts: req.params.thoughtsId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought deleted but no user with this ID!',
                    })
                    : res.json({ message: 'Thought successfully deleted!'})
            )
            .catch((err) => res.status(500).json(err));
    },

    // create reaction by id cause you gotta be able to to react to these tacos.
    addReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body } },
            {
                runValidators: true,
                new: true
            }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    /// delete reaction by id cause you never want to see that reaction to a taco ever again! 
    removeReaction(req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            {
                runValidators: true,
                new: true
            }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this ID!'})
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtsController;