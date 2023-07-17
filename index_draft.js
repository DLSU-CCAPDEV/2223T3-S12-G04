
const express = require(`express`);

const routes = require(`./routes/routes_draft.js`);
const hbs = require(`hbs`);

const app = express();
const port = 3000;


app.set(`view engine`, `hbs`);
hbs.registerPartials(__dirname + '/views/partials')

app.use(express.static(`public`));
app.use(`/`, routes);

app.listen(port, function() {
    console.log('app listening at port ' + port);
});
