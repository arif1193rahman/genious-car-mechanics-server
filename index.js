const express = require('express');
const { MongoClient, ListCollectionsCursor } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;



const cors = require('cors');
require('dotenv').config();

const app = express();

const port= 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l9eit.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
try{
    await client.connect();
    // console.log('connected to data base')

    // 2nd work
    // Data base name
    const database = client.db("carMechanic");
    // Services Collection
    const servicesCollection = database.collection("services");

// Get API
app.get('/services', async(req, res)=>{
    const cursor = servicesCollection.find({});
    const services = await cursor.toArray();
    res.send(services);
});

// Get single Service
app.get('/services/:id', async(req, res)=>{
    const is = req.params.id;
    console.log('getting specific service', id);
    const query = {_id: ObjectId(id)};
    const service = await servicesCollection.findOne(query);
    res.json(service);
})


    // POST API 3rd work
    app.post('/services', async(req, res)=>{
        const service = req.body;
        console.log('hit the post API', service);

        // head coded vabe bite hbe 
        // const service= {
                          
        //         "name": "ENGINE DIAGNOSTIC",
        //         "price": "300",
        //         "description": "Lorem ipsum dolor sit amet, consectetu radipisi cing elitBeatae autem aperiam nequ quaera molestias voluptatibus harum ametipsa.",
        //         "img": "https://i.ibb.co/dGDkr4v/1.jpg"
        // }
        // 4th work
        const result = await servicesCollection.insertOne(service)
        console.log(result)
        res.json(result);
    });


    // Delete
    app.delete('/services/:id', async(req, res)=>{
        const is = req.params.id;
        const query = {_id:ObjectId(id)};
        const result = await servicesCollection.deleteOne(query);
        res.json(result);
    })


}
finally{
    // await clint.close()
}
}

run().catch(console.dir);


app.get('/', (req, res)=>{
    res.send('Running Genious Server')
});

app.listen(port, ()=>{
    console.log('running genious server', port)

});