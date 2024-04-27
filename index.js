const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5555;
// Middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jd9hrzt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const run = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Create database and collection as table
    const craftCollection = client.db("Art&CraftDB").collection("crafts");

    app.post("/crafts", async (req, res) => {
      const newCraft = req.body; // get new item from client site
      console.log("New Craft", newCraft);
      // insertOne item and send to database
      const result = await craftCollection.insertOne(newCraft);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to the Aurora Artify Craft Emporium online store!");
});

app.listen(port, () => {
  console.log(`Aurora Artify Craft Emporium server is running on port ${port}`);
});
