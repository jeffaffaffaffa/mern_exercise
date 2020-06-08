import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {

    constructor(props) {
        //super props call when defining constructor of a sub class
        super(props);

        //bind this to each method, so it is correctly referring to the class
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeDur = this.onChangeDur.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //in react, can only update with setting state.
        //properties of state correspond to mongodb data format:
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //this is a react lifecycle method
    //will automatically be called before anything is loaded
    componentDidMount() {
        //axios makes CRUD operations for us
        axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }

    //will use webform with textbox
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDesc(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDur(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault(); //prevent default html form submit behavior

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));
            //the response written in backend!

        //takes you back to home page after submission
        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <select ref = "userInput"
                            required
                            className = "form-control"
                            value = {this.state.username}
                            onChange = {this.onChangeUsername}>
                            {   
                                //the array of all users from db
                                //for each user in the array, returns an option of the select box
                                //option has a key and value and the actual thing displayed is user.
                                this.state.users.map(function(user) {
                                    return <option
                                        key = {user}
                                        value = {user}>{user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className = "form-group">
                        <label>Description: </label>
                        <input type = "text"
                            required
                            className = "form-control"
                            value = {this.state.description}
                            onChange = {this.onChangeDesc}
                            />
                    </div>
                    <div className = "form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type = "text"
                            className = "form-control"
                            value = {this.state.duration}
                            onChange = {this.onChangeDur}
                            />
                    </div>
                    <div className = "form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected = {this.state.date}
                                onChange = {this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Create Exercise Log" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}