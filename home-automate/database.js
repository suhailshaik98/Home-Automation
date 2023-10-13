const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB server URL

// Database Name
const dbName = 'distancesensor'; // Replace with your database name


async function storeValueWithTimestamp(value) {
    try {
      // Create a timestamp
      const timestamp = new Date();
      timestamp.setUTCHours(timestamp.getUTCHours() - 4);
      // Data to be inserted
      const dataToInsert = {
        value: value,
        timestamp: timestamp,
      };
  
      // Use connect method to connect to the server
      const client = await MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected successfully to server');
      const db = client.db(dbName);
  
      // Insert document with timestamp
      const result = await db.collection('sensorvalues').insertOne(dataToInsert);
      console.log('Document inserted successfully');
  
      // Close the MongoDB connection
      await client.close();
    } catch (err) {
      console.error('Error:', err);
    }
  }
  
// storeValueWithTimestamp('20')
module.exports = { storeValueWithTimestamp };
