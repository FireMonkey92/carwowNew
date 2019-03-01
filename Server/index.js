var express = require('express');
var app = express();
var graphqlHTTP = require('express-graphql');
var schema = require('./Schema/Schema');
var mongoose = require('mongoose');
var cors = require('cors');

mongoose.connect("mongodb://sandeep:test123@ds137255.mlab.com:37255/gql-vikings-carwow", { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log("connected to carwow Database")
})

app.use(cors());
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true

}))

app.listen('8003', () => {
    console.log("Server listen to port 8003 !");
})