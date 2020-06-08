const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    //mongoose command to find all exercises from the database
    //return as json
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    //adding an exercise with all the properties from the request body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); //need to convert to Number type
    const date = Date.parse(req.body.date); //need to convert to Date type

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    //save exercise to db
    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//id at the end and is a get request; to see a certain exercise:
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//id at the end and a delete request:
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise has been deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//updating the exercise with a certain id with post request:
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise has been updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;