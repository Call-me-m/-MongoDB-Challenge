require('dotenv').config();
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const ProfileModel = require('./profile');
const {MongoClient} = require('mongodb');


const app = express();
const port = process.env.PORT;
const uri = process.env.MONGO_DB_URI;
const client = new MongoClient(uri);


app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_DB_URI)
.then(() => (console.log('connect to mongodb')), err => (console.log(`cant connect to db ${err}`)));

app.get('/', (req, res) => res.status(200).send('server running')); 
app.get('/get-profiles', (req, res) =>{
async function run () {
try{
    const database = client.db("project-forms");
    const profiles = database.collection("profiles");
    const result = await profiles.find().toArray();
    res.status(200).send(result);




} catch (err) {

    console.log(err);
};

}
run().catch(console.dir);
});

app.post('/add-profile', (req, res) => {
    const incomingData = req.body;

    try{
        const newProfile = new ProfileModel(incomingData);
        newProfile.save();

        res.status(200).send({
            message: 'saved profile'
        });
    } catch (err) {
        console.log(err);
    }
});

app.delete('/delete-profiles', (req, res) => {

async function run() { caches
    try{

        const database = client.db("project-forms");
        const profiles = database.collection("profiles");
        const result = await profiles.deleteOne();
        if (result.deleteCount === 1) {

            res.status(200).send({

                message: 'Successfully deleted one document'
            });
} else { 

    res.status(200).send({

message: 'no documents matched the  query. Deleted 0 documents.'

    });


}
    


}catch (eer) {
console.log(err)

}


}

run().catch(console.dir);
}
)

app.listen(port, () => {
    console.log(`server is running at https://localhost: ${port}`);

});

