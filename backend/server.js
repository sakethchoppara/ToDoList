const express = require('express')
const cors = require('cors')
const app = express()
const accessRouter = require('./route/accessRoute')
const {testConnection }= require('./database/db')
const protectedRoutes = require('./route/protectedRoute')

// middleware handleing 
app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded())
app.use('/api',accessRouter)
app.use('/api',protectedRoutes)
testConnection();

// request handleing
app.get('/',(req,res)=>{
    res.send("hiiiiii") 
})

app.listen('8000')



// project-root/
// │
// ├── app.js
// ├── package.json
// ├── node_modules/
// ├── controllers/
// │   └── userController.js
// ├── models/
// │   └── userModel.js
// ├── routes/
// │   └── userRoutes.js
// ├── views/
// │   └── index.ejs
// └── config/
//     └── db.js
