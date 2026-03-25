import express from 'express';
import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();

const css = path.resolve('public')
app.use(express.static(css))

app.set('view engine', 'ejs')

const dbName = 'to-do-list';
const collection = 'tasks';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connection = async () => {
    const connect = await client.connect();
    return await connect.db(dbName);
};


app.use(express.urlencoded({ extended: false }))
app.get('/', async(req, resp) => {
    const db = await connection();
    const list = db.collection(collection)
    const result =await list.find().toArray();
    resp.render('list', {result})
})

app.get('/add', (req, resp) => {
    resp.render('add')
})

app.get('/update', (req, resp) => {
    resp.render('update')
})

app.post('/add', async (req, resp) => {
    const db = await connection();
    const task = await db.collection(collection).insertOne(req.body);
    if (task){
        resp.redirect('/')
    }else{
        resp.send('Error adding task')
    }
    
})


app.get('/delete/:id', async (req, resp) => {
    const db = await connection();
    const task = await db.collection(collection).deleteOne({ _id: new ObjectId(req.params.id) });
    if (task){
        resp.redirect('/')
    }else{
        resp.send('Error deleting task')
    }
    
})

app.get('/update/:id', async (req, resp) => {
    const db = await connection();
    const task = await db.collection(collection).findOne({ _id: new ObjectId(req.params.id) });
    if (task){
        resp.render('update', { task })
    }else{
        resp.send('Error updating task')
    }
    
})

app.post('/update/:id', async (req, resp) => {
    const db = await connection();
    const filter = { _id: new ObjectId(req.params.id) };
    const updateData = {$set: { task: req.body.task, description: req.body.description }};
    const task = await db.collection(collection).updateOne(filter, updateData);
    if (task){
        resp.redirect('/')
    }else{
        resp.send('Error updating task')
    }
    
})




app.use((req, resp) => {
    resp.status(404).render('404')

})


app.listen(3200)