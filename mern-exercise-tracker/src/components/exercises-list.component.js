import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Exercise component is a functional react component
//diff from class component; lack of state and lifecycle methods
//simply accepts props and returns JSX.
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    {/* only want the first part of the date string (just the date) */}
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
        {/* passing in links to edit and delete the exercise */}
        {/* edit uses another componet */}
        <Link to={"/edit/"+props.exercise._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
    </td>
  </tr>
)
 //class component
export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this)

        //list of exercises for server to populate
        this.state = {exercises: []};
        }

    componentDidMount() {
        //get list of exercises from db!
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({ exercises: response.data })
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteExercise(id) {
        //deletes a specific exercise using its id
        axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)});

        this.setState({
            //use filter to find correct element in the exercises list
            //for every element, return if el._id !== id
            //in other words, we don't render the one we delete.
            //_id is from mongo db
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    exerciseList() {
        //returns every element in exercises list with the deleteExercise function passed through
        return this.state.exercises.map(currentexercise => {
            //uses the Exercise component created at the top of this file.
            return <Exercise exercise = {currentexercise} deleteExercise = {this.deleteExercise} key = {currentexercise._id} />;
        })
    }

    render() {
        return (
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
            <thead className="thead-light">
                <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.exerciseList() }
            </tbody>
            </table>
        </div>
        )
    }
}