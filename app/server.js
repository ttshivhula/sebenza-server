/* eslint-disable import/order */
/* eslint-disable no-console */
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { loginStrategy } = require('./utils');

dotenv.config();

const corsSetup = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Cache-Control, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
};
const app = require('express')();
const server = require('http').createServer(app);

const port = process.env.PORT || 4242;

loginStrategy(passport);
app.use(passport.initialize());
app.set('trust proxy', 1);
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(corsSetup);
app.disable('etag');

app.get('/', (req, res) => res.send('Server is running'));

app.use('/api/users', routes.users);
app.use('/api/posts', routes.posts);

server.listen(port, () => {
  console.log(`API Server is running on port: ${port}`);
});
