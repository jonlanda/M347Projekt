const { MongoClient, ObjectId } = require('mongodb');

// Replace with the connection string for your MongoDB service
const uri = 'mongodb://mongo:mysecretpassword@10.2.32.17:31000/';
const client = new MongoClient(uri);

exports.getAllFilms = async () => {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('film');
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

exports.getFilmById = async (id) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('film');
        const film = await db.collection('film').find({ _id: new ObjectId(id) }).toArray();
        console.log('Found documents by FilmId with id :', id, film);
        return film;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

exports.getLinksForFilm = async (id) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('film');
        const links = await db.collection('link').find({ filmId: id }).toArray();
        console.log('Found documents:', links);
        return links;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

exports.getLinksForFilmAndLanguage = async (id, dubLanguage) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('film');
        const links = await db.collection('link').find({ filmId: id, dubLanguage: dubLanguage.toLowerCase() }).toArray();
        console.log('Found documents:', links);
        return links;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

exports.addLink = async (linkValue, filmId, adBlocker, dubLanguage, subLanguage) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('film');
        const links = await db.collection('link').insertOne({ linkValue: linkValue, filmId: filmId, adBlocker: adBlocker, dubLanguage: dubLanguage, subLanguage: subLanguage });
        console.log('query result:', links);
        return links;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

exports.newFilm = async (filmName, description, genres, filmOrSeries) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        const db = client.db('film');
        const newGenres = genres.split(",").map(genre => genre.trim());
        const films = await db.collection('film').insertOne({ filmName: filmName, description: description, genres: [newGenres], filmOrSeries: filmOrSeries });
        console.log('query result:', films);
        return films;
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
        console.log('Connection closed');
    }
}

