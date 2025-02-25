const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer');

const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await runQueries();

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit();
};

const runQueries = async () => {
    console.log('Queries running.');
};

connect()


const welcome = () => {
    prompt(`Welcome to the CRM

What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit

Number of action to run: 
# user inputs 3
`);
};

welcome();