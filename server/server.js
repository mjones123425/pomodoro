const User = require('./UserSchema');
const express = require('express');
const cors = require('cors');
const app = express();

// setup backend server 
app.use(express.json());
app.use(cors())
app.listen(3000, ()=> {
    console.log('Server Started at ${3000}')
})

// connect to mongoDB
const mongoose = require('mongoose');
// NEED TO CHANGE 
const mongoString = "mongodb+srv://your_username:your_password@cluster0.uxnmmuy.mongodb.net/lab"
mongoose.connect(mongoString)
const database = mongoose.connection

// check if connection is successful or not
database.on('error', (error) => console.log(error)) 
database.once('connected', () => console.log('Databased Connected'))

// back-end API point for signup
app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    const un = req.body.username
    try {
        //Check if username already exists in database
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){
        res.status(500).send(error)
    }
})

// back-end API point for login
app.get('/getUser', async (req, res) => {
    console.log(`SERVER: GET USER REQ BODY: ${req.query}`)
    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})
