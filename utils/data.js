const names = [
    'Aaran',
    'Aaren',
    'Aarez',
    'Aarman',
    'Aaron',
    'Aaron-James',
    'Aarron',
    'Aaryan',
    'Aaryn',
    'Aayan',
    'Aazaan',
    'Abaan',
    'Abbas',
    'Abdallah',
    'Abdalroof',
    'Abdihakim',
    'Abdirahman',
    'Abdisalam',
    'Abdul',
    'Abdul-Aziz',
    'Abdulbasir',
    'Abdulkadir',
    'Abdulkarem',
    'Smith',
    'Jones',
    'Coollastname',
    'enter_name_here',
    'Ze',
    'Zechariah',
    'Zeek',
    'Zeeshan',
    'Zeid',
    'Zein',
    'Zen',
    'Zendel',
    'Zenith',
    'Zennon',
    'Zeph',
    'Zerah',
    'Zhen',
    'Zhi',
    'Zhong',
    'Zhuo',
    'Zi',
    'Zidane',
    'Zijie',
    'Zinedine',
    'Zion',
    'Zishan',
    'Ziya',
    'Ziyaan',
    'Zohaib',
    'Zohair',
    'Zoubaeir',
    'Zubair',
    'Zubayr',
    'Zuriel',
    'Xander',
    'Jared',
    'Courtney',
    'Gillian',
    'Clark',
    'Jared',
    'Grace',
    'Kelsey',
    'Tamar',
    'Alex',
    'Mark',
    'Tamar',
    'Farish',
    'Sarah',
    'Nathaniel',
    'Parker',
];

const thoughtDescriptions = [
    'Chocolate Chip Cookies Are The Best Cookie',
    'BLACKPINK is my favorite girl-group',
    'I want to learn how to play piano',
    'Vanilla Lattes are so yummy',
    'I love cooking',
    'Monopoly is such a boring game',
    'Movie trailers have gotten so bad',
    'Hello world, my name is Taylor Swift',
    'Social media is so addicting',
    'How do you like to take notes?',
    'I have so many unread messages',
    'Do you check your email regularly?',
    'How does a compass work?',
    'Chrome or Safari- which is better?',
    'I want to download a running app. I was thinking the Nike one',
    'I love finding new recipes!',
    'Do you play poker? I want to learn',
    'I make deliveries for DoorDash',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
    `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomThoughts = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
        results.push({
            thoughtName: getRandomArrItem(thoughtDescriptions),
            score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
        });
    }
    return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts };
