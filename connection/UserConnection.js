const {MongoClient} = require('mongodb');

function UserConnection(){
    this.getCollection = async function(){
        const client =  new MongoClient(' mongodb://localhost:27017',{ useUnifiedTopology: true });
        await client.connect()
        const database = client.db('drixit');
        const collection = database.collection('users')
        return collection;
    }
} 


module.exports = new UserConnection();
