
/* eslint no-console: off */
const http = require('http');
const app = require('./lib/app');
const connect = require('./lib/connect');

const PORT = process.env.PORT || 3000;
//PORT for heroku
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mongeese';

connect(MONGODB_URI);

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Many mongeese at', server.address().port);
});