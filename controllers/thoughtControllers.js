const { Thoughts, User } = require('../models');

module.exports = {
    // GETS all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GETS a single thought by id
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thoughts.findOne({ _id: req.params._thoughtId });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a new thought
    async createThought(req, res) {
        try {
            const thoughts = await Thoughts.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughts._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with that ID',
                })
            }

            res.json('Thought created 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // PUT to update a thought by id
    async updateThought(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETES a thought by id
    async deleteThought(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought deleted but no user with this id!',
                });
            }

            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a reaction stored in a single thought's `reactions` array field
    async addReaction(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.params.reactionId } },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    async removeReaction(req, res) {
        try {
            const thoughts = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thoughts) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
