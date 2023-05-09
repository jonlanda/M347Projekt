const { MongoClient, ObjectId } = require('mongodb');

// Replace with the connection string for your MongoDB service
const uri = 'mongodb://mongo:mysecretpassword@10.2.32.17:31000/';
const client = new MongoClient(uri);

let checkData = (data) => {
    let response = [];
    try {
        JSON.parse(data);
    } catch (error) {
        response.push({
            "errno": 1000,
            "errmsg": "Bad JSON Format.",
            "detail": `${error}`
        })
    }
    data.forEach(element => {
        const {
            error
        } = schema.validate(element);
        if (error) {
            console.log(error._original);
            if (error.details[0].message === '"device" is required') {
                response.push({
                    "errno": 1001,
                    "errmsg": "Missing device name."
                })
            }
            if (error.details[0].message === '"time" is required') {
                response.push({
                    "errno": 1002,
                    "errmsg": "Missing Timestamp."
                })
            }
            if (error.details[0].message == '"time" must be in iso format') {
                response.push({
                    "errno": 1003,
                    "errmsg": "Bad Value for.",
                    "detail": `Timestamp: ${error.details[0].context.value} Object: ${data.indexOf(error._original) + 1}`
                })
            }
        }
    });
    return response;
}

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
