import express from 'express';
import path from 'path';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

const app = express();

const css = path.resolve('public')
app.use(express.static(css))

app.set('view engine', 'ejs')

const dbName = 'to-do-list';
const collection = 'tasks';
const user = 'users';
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const connection = async () => {
    const connect = await client.connect();
    return await connect.db(dbName);
};


app.use(express.urlencoded({ extended: false }))
app.get('/', async(req, resp) => {
    if (!currentUser){ 
        return resp.redirect('/login');
    }
    const db = await connection();
    const list = db.collection(collection)
    const result =await list.find({ owner: currentUser }).toArray();
    resp.render('list', {result})
})

app.get('/add', (req, resp) => {
    resp.render('add')
})

app.get('/update', (req, resp) => {
    resp.render('update')
})

app.post('/add', async (req, resp) => {
    if (!currentUser){ 
        return resp.redirect('/login');
    }
    const db = await connection();
    const task = await db.collection(collection).insertOne({
        ...req.body,
        owner: currentUser,
        createdAt: new Date()
    });
    if (task){
        resp.redirect('/')
    }else{
        resp.send('Error adding task')
    }
    
})


app.get('/delete/:id', async (req, resp) => {
    const db = await connection();
    const task = await db.collection(collection).findOne({ _id: new ObjectId(req.params.id), owner: currentUser });
    if (!task){
        return resp.status(403).send('Not allowed');
    }else{
        await db.collection(collection).deleteOne({ _id: task._id });
        resp.redirect('/');
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

app.get('/register', (req, resp) => {
    resp.render('register')
})

app.get('/login', (req, resp) => {
    resp.render('login')
})

let currentUser = null;

app.post('/register', async (req, resp) => {
    try {
        const db = await connection();
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return resp.status(400).render('register', { error: 'All fields are required' });
        }

        const existing = await db.collection(user).findOne({ username });
        if (existing) {
            return resp.status(409).render('register', { error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userInfo = await db.collection(user).insertOne({
            username,
            email,
            password: hashedPassword
        });

        if (userInfo) {
            return resp.redirect('/login');
        }

        return resp.status(500).render('register', { error: 'Error registering user' });
    } catch (err) {
        console.error('Registration error:', err);
        return resp.status(500).render('register', { error: 'Error registering user' });
    }
});

app.post('/login', async (req, resp) => {
    try {
        const db = await connection();
        const { username, password } = req.body;

        if (!username || !password) {
            return resp.status(400).render('login', { error: 'Username and password are required' });
        }

        const foundUser = await db.collection(user).findOne({ username });
        if (!foundUser) {
            return resp.status(401).render('login', { error: 'Invalid username or password' });
        }

        const passwordMatches = await bcrypt.compare(password, foundUser.password);
        if (!passwordMatches) {
            return resp.status(401).render('login', { error: 'Invalid username or password' });
        }
        currentUser = foundUser.username;
        return resp.redirect('/');
    } catch (err) {
        console.error('Login error:', err);
        return resp.status(500).render('login', { error: 'Error logging in' });
    }
});

app.get('/logout', (req, resp) => {
  currentUser = null;
  resp.redirect('/login');
});


app.use((req, resp) => {
    resp.status(404).render('404')

})


app.listen(3200)