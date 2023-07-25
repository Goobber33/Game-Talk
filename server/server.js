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
        console.log(`Received search query: ${req.query.query}`);
        
        // Define a regex for case-insensitive matching
        const regex = new RegExp(req.query.query, 'i');
        
        // Define an array of queries for each field
        const queries = [
            { "id": { $regex: regex } },
            { "CLASS": { $regex: regex } },
            { "TERM": { $regex: regex } },
            { "TECHNICAL TERM": { $regex: regex } },
            { "DEFINITION": { $regex: regex } },
            { "SPECIALIZATION": { $regex: regex } },
            { "PvP": { $regex: regex } },
            { "PvE": { $regex: regex } },
            { "SYNONYMS": { $regex: regex } },
            { "TALENTS": { $regex: regex } },
            { "PVP TALENTS": { $regex: regex } },
            { "SCHOOL OF MAGIC": { $regex: regex } },
            { "COVENANT": { $regex: regex } },
            // Add more fields as needed
        ];
        
        const query = { 'TERM': { $regex: new RegExp(req.query.query), $options: 'i' } };

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
