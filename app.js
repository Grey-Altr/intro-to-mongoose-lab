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

    welcome();

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

    process.exit();
};

const runQueries = async () => {
    console.log('Queries running.');
    await createCustomer();
    await viewAll();
    await updateCustomer();
    await deleteCustomer();
};

connect()


const welcome = () => {
    while (true) {
        const action = prompt(`Welcome to the CRM

        What would you like to do?

          1. Create a customer
          2. View all customers
          3. Update a customer
          4. Delete a customer
          5. Quit

        Number of action to run: `);

        if (action ==='1') {
            createCustomer();
        } else if (action === '2') {
            viewAll();
        } else if (action === '3') {
            updateCustomer();
        } else if (action === '4') {
            deleteCustomer();
        } else if (action === '5') {
            quitApp();
        } else {
            console.log('Invalid option.');
        };
    };
};



const createCustomer = async () => {
    const name = prompt('Enter customer name: ');
    const age = prompt('Enter customer age: ');

    const customer = new Customer({ name, age });
    await customer.save();

    console.log('New customer created.')
};

const viewAll = async () => {
    const customers = await Customer.find();

    if (customers.length === 0) {
        console.log('No customers found.');
    }

    customers.forEach((customer, index) => {
        console.log(`${index + 1}. ${customer.name} - ${customer.age}`);
    });
};

const updateCustomer = async () => {
    const name = prompt('Enter name of customer to update: ');
    const customer = await Customer.findOne({ name });
    
    if (!customer) {
        console.log('Customer not found.');
        return;
    };

    const updateName = prompt(`Enter new name for (${customer.name}): `);
    const updateAge = prompt(`Enter new age for (${customer.age}): `);

    await customer.save();

    console.log(`Customer ${customer.name} updated.`);
};

const deleteCustomer = async () => {
    const name = prompt('Enter name of customer to delete: ');
    const customer = await Customer.findOneAndDelete({ name });

    if (!customer) {
        console.log('Customer not found.');
    } else {
        console.log(`Customer ${customer.name} deleted.`);
    };
};

const quitApp = () => {
    console.log('exiting...');
    mongoose.connection.close();
};