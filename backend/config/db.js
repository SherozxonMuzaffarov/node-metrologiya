const mongoose = require('mongoose');

const dbConnect = async() => {
    try {
        mongoose.connect(process.env.MOMGODB_URL);
        console.log("Database connected successfully");

        
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
        console.log('Connected to MongoDB');
        });

        // const defaultUser = {
        //     username: 'admin',
        //     password: 'admin123',
        //     // Add other user properties as needed
        // };

        // // Check if the default user already exists
        // const existingUser = await User.findOne({ username: defaultUser.username });

        // if (!existingUser) {
        //     // Insert the default user into the database
        //     await User.create(defaultUser);
        //     console.log('Default user inserted successfully.');
        // } else {
        //     console.log('Default user already exists.');
        // }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = dbConnect;
