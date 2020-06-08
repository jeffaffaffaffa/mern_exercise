//needs the express router
const router = require('express').Router();
//need to require the mongoose model (schema)
let User = require('../models/user.model');

//handles http get requests
//if it is a "/" at the end and it is a "get" request, this next bit will happen:
router.route('/').get((req, res) => {
    //.find() is a mongoose method that gets a list of all the users from the mongodb
    //it returns a promise in json format
    //then we return the users in json format
    //if theres an error, return error with catch
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error ' + err));
});

//handles http post requests
//if it is a "/add" at the end and it is a post request, this next bit will happen:
router.route('/add').post((req, res) => {
    //the new username is part of the request body
    const username = req.body.username;
    //create a new instance of User with the username
    const newUser = new User({username});

    //save user to the database
    //then returns user added in json
    //otherwise return error message
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;