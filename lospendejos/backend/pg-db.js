const { MongoClient } = require('mongodb');

// Replace with the connection string for your MongoDB service
const uri = 'mongodb://mongo:mysecretpassword@localhost:27017/';
const client = new MongoClient(uri);

exports.run = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('filmDB');
        const films = await db.collection('film').find().toArray();
        console.log('Found documents:', films);
        return films;
    } catch (error) {
        console.error(error);
    } finally {
        // Close the connection to the MongoDB server
        await client.close();
        console.log('Connection closed');
    }
}

exports.run();

exports.getAllFilms = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('filmDB');
        const films = await db.collection('film').find().toArray();
        console.log('Found documents:', films);
        return films;
    } catch (error) {
        console.error(error);
    } finally {
        // Close the connection to the MongoDB server
        await client.close();
        console.log('Connection closed');
    }
}
