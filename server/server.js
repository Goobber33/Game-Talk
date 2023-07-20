require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors()); // Use cors middleware
app.use(express.json());

app.get('/api/search', async (req, res) => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const collection = client.db("gdata").collection("gdata");
        const query = { term: req.query.query }
        
        // Log the query to the console
        console.log(`Searching for: ${JSON.stringify(query)}`);

        // Use find() instead of findOne(), and convert the result to an array
        const result = await collection.find(query).toArray();

        res.send(result);
    } catch (err) {
        console.log(err);
        
        // Send a 500 error response
        res.status(500).send(err.message);
    } finally {
        await client.close();
    }
});

app.get('/api/count', async (req, res) => {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const collection = client.db("gdata").collection("gdata");
        
        const count = await collection.countDocuments({});
        
        res.send(`Total documents: ${count}`);
    } catch (err) {
        console.log(err);
        
        // Send a 500 error response
        res.status(500).send(err.message);
    } finally {
        await client.close();
    }
});




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
