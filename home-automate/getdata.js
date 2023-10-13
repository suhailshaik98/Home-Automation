
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB server URL

// Database Name
const dbName = 'distancesensor'; // Replace with your database name

async function getAllValues() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log('Connected successfully to server');
  
      const db = client.db(dbName);
  
      // Retrieve all documents from the collection
      const collection = db.collection('sensorvalues');
      const values = await collection.find({}).toArray();
  
      // Log all retrieved values
      console.log('All values in the collection:');
      console.log(values);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      // Close the MongoDB connection
      if (client) {
        await client.close();
        console.log('Connection closed');
      }
    }
  }

  async function getTodaysTimestampValues() {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
    try {
      // Connect to the MongoDB server
      await client.connect();
      console.log('Connected successfully to server');
  
      const db = client.db(dbName);
  
      // Calculate the start and end timestamps for today
    //   const today = new Date();
    //   today.setHours(0, 0, 0, 0); // Set to the beginning of the day
    //   const tomorrow = new Date(today);
    //   tomorrow.setDate(tomorrow.getDate() + 1); // Set to the beginning of the next day
    const now = new Date();
    const pastHour = new Date(now);
    pastHour.setHours(now.getHours() - 1);
  
      // Query for documents with timestamps in the specified range
      const collection = db.collection('sensorvalues');
    //   const values = await collection.find({
    //     timestamp: {
    //       $gte: today,
    //       $lt: tomorrow
    //     }
    //   }).toArray();
    const values = await collection.find({
        timestamp: {
          $gte: pastHour,
          $lt: now
        }
      }).toArray();
  
      // Log values for today
      console.log('Timestamp values for today:');
      console.log(values);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      // Close the MongoDB connection
      if (client) {
        await client.close();
        console.log('Connection closed');
      }
    }
  }
getTodaysTimestampValues();
// getAllValues();
