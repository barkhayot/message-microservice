const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const kafka = require('kafka-node');
const sqlite3 = require('sqlite3').verbose();

// Database Definition
const db = new sqlite3.Database('./database.db');

// Create Messages Table in Database
db.serialize(() => {
    db.run(
      'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, message TEXT, content TEXT)'
    );
  });
  

// Check recieved data from Producer 
app.get('/data', (req, res) => {
    db.all('SELECT * FROM messages', (err, rows) => {
      if (err) {
        console.error(err.message);
      }
      res.send(rows);
    });
  });

// Definition of Kafka Client Function (credentials can be set)  
const kafkaClient = new kafka.KafkaClient({
    kafkaHost: 'localhost:29092'
  });

  const consumer = new kafka.Consumer(
    kafkaClient,
    [
      {
        topic: 'messages', partition: 0, offset: 0
      }
    ],
    {
      autoCommit: true
    }
  );
  
  // Saving recieved data to database 
  consumer.on('message', message => {
    const data = JSON.parse(message.value);
    db.run(
      'INSERT INTO messages (message, content) VALUES (?, ?)',
      [data.message, data.content],
      function(err) {
        if (err) {
          console.error(err.message);
        }
      }
    );
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





