const express = require('express')
const mongoose = require('mongoose')
const productRoute = require('./routes/product.route');
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use("/api/products", productRoute);

//Home Page
app.get('/', (req, res) => {
    res.send('Hello frpm Node API 3000');
})



//db connect
mongoose.connect('mongodb+srv://mohanraj31521:mZdghPr58uk4nD3E@backenddb.lgigeag.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
    .then(() => {
        console.log('Database Connected!');
        app.listen(3000, () => {
            console.log('Server is Running')
        });
    })
    .catch(() => console.log('Error'));