const express = require ('express')
const app = express();
const cors = require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://redux-admin-home:NGpaHyi2chtXjx8A@cluster0.pygokcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// user: redux-admin-home
//password: NGpaHyi2chtXjx8A

// declare a port
const port = 5000

// middleware 
app.use(cors());
app.use(express.json())



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //await client.connect();
    // Send a ping to confirm a successful connection

    // create a collection
    const reduxAuthUsersCollection = client.db('reduxAuth').collection('reduxUsers')

    // get all users
    app.get('/users', async(req, res)=>{
        const result = await reduxAuthUsersCollection.find().toArray();
        res.send(result);
    })
    // post a single user
    app.post('/register', async (req, res) => {
      try {
        // Create user logic here
        const user = req.body;
        const query = {email : user.email};
        const existUser = await reduxAuthUsersCollection.findOne(query)
        if(existUser){
          return res.send({message : "User alredy exist", insertedId: null})
        }
        const result = await reduxAuthUsersCollection.insertOne(user);
        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });
    // delete an user
    app.delete('/users/:id', async (req, res) => {
      
    });

    

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

   



  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

run();

app.get('/', (req, res)=>{
    res.send('Hello abul Kasems world')
})  



app.listen(port, ()=>{
    console.log(`server start on port of: ${port}`);
})