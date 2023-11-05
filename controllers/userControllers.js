const { User, Thoughts } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.id });

            if (!deletedUser) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'No friend with this id!' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friend: { friends: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'No friend with this id!' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};