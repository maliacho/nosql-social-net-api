const { Thoughts } = require('../models');

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
            const thoughts = await Thoughts.findOne({ _id: req.params.id });

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
            const dbUserData = await Thoughts.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a thought by id
    async updateThought(req, res) {
        try {
            const updatedThought = await Thoughts.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            res.json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETES a thought by id
    async deleteThought(req, res) {
        try {
            const deleteThought = await Thoughts.findOneAndRemove({ _id: req.params.id });

            if (!deleteThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a reaction stored in a single thought's `reactions` array field
    // 
    async createReaction(req, res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: {
                    reactionBody: req.body.reactionBody, 
                    username: req.body.username
                }}  },
                { new: true }
            );

            if (!newReaction) {
                return res.status(404).json({
                    message: 'A new reaction was created, but found no thought with that ID',
                });
            }
            res.json('Created a new Reaction! 🎉');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE to pull and remove a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thought.findOneAndUpdate(
                
                {_id: req.params.thoughtId},
                {$pull:{
                    reactions: {
                        reactionId: req.params.reactionId
                    }
                }},
                { new: true }
                );

            if (!deleteReaction) {
                return res.status(404).json({ message: 'No reaction was found with this id!' });
            }
            res.json({ message: 'Reaction successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
