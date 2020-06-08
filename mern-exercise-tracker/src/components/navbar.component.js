import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//all components begin like this:
export default class Navbar extends Component {
    //all components need to render something:
    render() {
        return (
            //special class names for bootstrap styling; checkout documentation for more stuff.
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to = "/" className = "navbar-brand">MERS Exercise Tracker</Link>
                <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                            <Link to = "/" className = "nav-link">Exercises</Link>
                        </li>
                        <li className = "navbar-item">
                            <Link to = "/create" className = "nav-link">Create Exercise Log</Link>
                        </li>
                        <li className = "navbar-item">
                            <Link to = "/user" className = "nav-link">Create User</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}