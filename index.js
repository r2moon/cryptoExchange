//// Define const variables
const express = require('express');
const coinRouter = require('./routes/coinRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

let server = express();

//// CORS configuration
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  corsOptions = { origin: true, credentials: true }; // disable CORS for this request
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const corsOptions = {
  origin: true,
  methods: 'GET,POST',
  credentials: true,
  preflightContinue: false,
  maxAge: 600,
};

server.options('*', cors(corsOptions));
server.use(express.static(__dirname + '/public'));
server.set('view engine', 'ejs');
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());
server.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

//// Router configuration
server.use('/coin', [cors(corsOptionsDelegate)], coinRouter);

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});