const { Thoughts, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find()
            .populate('thoughts');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughts = await Thoughts.findOne({ _id: req.params.thoughtId });

            if (!thoughts) {
                return res.status(404).json({ message: 'No thoughts with that ID' });
            }

            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
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
    async updateThought(req, res) {
        try {
            const thoughts = await Application.findOneAndUpdate(
                { _id: req.params.applicationId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!application) {
                return res.status(404).json({ message: 'No application with this id!' });
            }

            res.json(application);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // locates an instance of an application by id and deletes it, we also update the user associated with that application and remove the application id from their profile
    async deleteApplication(req, res) {
        try {
            const application = await Application.findOneAndRemove({ _id: req.params.applicationId });

            if (!application) {
                return res.status(404).json({ message: 'No application with this id!' });
            }

            const user = await User.findOneAndUpdate(
                { applications: req.params.applicationId },
                { $pull: { applications: req.params.applicationId } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Application created but no user with this id!',
                });
            }

            res.json({ message: 'Application successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // locates an instance of an application by id and deletes a specific tag by its id
    async removeTag(req, res) {
        try {
            const application = await Application.findOneAndUpdate(
                { _id: req.params.applicationId },
                { $pull: { tags: { tagId: req.params.tagId } } },
                { runValidators: true, new: true }
            );

            if (!application) {
                return res.status(404).json({ message: 'No application with this id!' });
            }

            res.json(application);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
