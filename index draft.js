const dotenv = require(`dotenv`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const routes = require(`./routes/routes.js`);
const hbs = require(`hbs`);

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(`public`));
app.use(bodyParser.urlencoded( {extended: false} ))
app.use(`/`, routes);

app.listen(port, hostname, function() {
    console.log(`Server running at: `);
    console.log(`http://` + hostname + `:` + port);
});
