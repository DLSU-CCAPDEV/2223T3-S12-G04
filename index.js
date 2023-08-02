
const express = require(`express`);
const session = require(`express-session`);

const routes = require(`./routes/routes.js`);
const hbs = require(`hbs`);

const db = require(`./models/db.js`);

const app = express();
const port = 3000;

// Set up the session middleware
app.use(session({
  secret: 'this_is_a_test_secret_key_just_for_example',
  resave: true,
  saveUninitialized: true
}));

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(`public`));
app.use(`/`, routes);


db.connect();

app.listen(port, function() {
    console.log('app listening at port ' + port);
});
