const { User, Thoughts } = require('../models');

module.exports = {
    // GETS all users
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate('user');
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GETS a single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('user');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST (create) a new user 
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // @@TODO need a function to update a user
    // DELETES a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
            res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // POST to add a new friend to a user's friend list
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
    // DELETE to remove a friend from a user's friend list
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