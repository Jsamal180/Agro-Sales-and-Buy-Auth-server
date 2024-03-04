const { default: mongoose } = require('mongoose');
const uri = "mongodb+srv://samaljyotiprakash180:A3.g5,12@cluster0.xpz6n89.mongodb.net/AgroDB?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connectDB = mongoose.connection;
connectDB.on('error', console.error.bind(console, "Error connecting to MongoDB"));
connectDB.once('open', function(){
    console.log('Connected to DB :: MongoDB');
})
module.exports = connectDB;