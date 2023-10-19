const connection = require('../config/connections');
const { Thoughts, User } = require('../models');
const { getRandomName, getRandomThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await Thoughts.deleteMany({});

    await User.deleteMany({});

    const user = [];

    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThoughts(20);

        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];

        user.push({
            first,
            last,
            thoughts,
        });
    }

    await User.collection.insertMany(user);

    await Thoughts.collection.insertOne({
        thoughtName: 'BLACKPINK',
        user: [...user],
    });

    console.table(user);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
