const  express = require('express');
const schema = require('./schema');
const graphqlHTTP = require('express-graphql');
const port = 3001;
const axios = require('axios')
const app = express();
const dev = process.env.NODE_ENV === 'development';

app.use('/graphql', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));
//to get the link data
axios.get('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data.data));


const server = app.listen(port, () => {
    console.log(`\n\nExpress listen at http://localhost:${port} \n`);
});
