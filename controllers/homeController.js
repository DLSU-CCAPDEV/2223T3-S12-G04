
/*
    defines an object which contains functions executed as callback
    when a client requests for `success` paths in the server
*/
const homeController = {

    /*
        executed when the client sends an HTTP GET request `/success`
        as defined in `../routes/routes.js`
    */
    getHome: function (req, res) {

        /*
            when passing values using HTTP GET method
            the values are stored in the req.query object
            Example url: `http://localhost/success?fName=A&lName=B&idNum=123`
            To retrieve the value of parameter `fName`: req.query.fName
        */
        var details = {
            firstname: req.query.firstname,
            lastname: req.query.lastname,
			idNum: req.query.idNum,
        };

        // render `../views/success.hbs`
        res.render('home', details);
    }

}

/*
    exports the object `successController` (defined above)
    when another script exports from this file
*/
module.exports = homeController;
