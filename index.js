
const express = require(`express`);

const routes = require(`./routes/routes.js`);
const hbs = require(`hbs`);

const db = require(`./models/db.js`);

const app = express();
const port = 3000;


app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.urlencoded({extended: true}));

app.use(express.static(`public`));
app.use(`/`, routes);

db.connect();

app.listen(port, function() {
    console.log('app listening at port ' + port);
});
