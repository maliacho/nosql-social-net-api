const { Schema, model } = require('mongoose');
// const Thoughts = require('./Thought')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+..+/, "Not a valid email!"]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    }
    // {
    //     toJSON: {
    //         virtuals: true,
    //     },
    //     id: false,
    // }
);
// userSchema
//     .virtual('fullName')
//     .get(function () {
//         return `${this.first} ${this.last}`;
//     })
//     .set(function (v) {
//         const first = v.split(' ')[0];
//         const last = v.split(' ')[1];
//         this.set({ first, last });
//     });


userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);


module.exports = User;