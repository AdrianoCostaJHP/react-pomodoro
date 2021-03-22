import { MongoClient, Db } from 'mongodb';
import url from 'url';

let uri  = process.env.MONGODB_URI;
let cachedClient: MongoClient = null;
let cachedDb: Db = null;

if(!url){
    throw new Error('Defina uma MONGODB_URI  com o MongoDB!')
}



export async function connectToDataBase() {

    if (cachedDb && cachedClient) {
        return {client: cachedClient, db: cachedDb}
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const dbName = url.parse(uri).pathname.substr(1);
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;
    return {client, db};
}

