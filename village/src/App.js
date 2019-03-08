import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
// import ItemsList from "./components/SmurfList";
// import Home from "./components/Home";
// import "./styles.css";


import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from "react-router-dom";
import axios from "axios";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(response => this.setState({ items: response.data }))
      .catch(error => console.log(error));
  }
  
  
  
  
  
  
  render() {
    return (
      <div className="App">
        <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
