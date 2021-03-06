import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs'; //Home
import Smurf from './components/Smurf'; 
// import SmurfsList from "./components/SmurfsList";
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
      activeSmurf: null,
      smurfs: [],
      error: ""
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        console.log(res);
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: err });
      });
  }
  

  addSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        // HTTP STEP V - Clear data form in ItemForm and route to /item-list
        this.props.history.push('/smurf-list');
      })
      .catch(err => {
        console.log(err);
      });
  };  


  setUpdateForm = (e, smurf) => {
    e.preventDefault();
    this.setState({
      activeSmurf: smurf
    });
    this.props.history.push("/smurf-form");
  };
  


  updateSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3333/smurfs${smurf.id}`, smurf)
      .then(res => {
        this.setState({
          activeSmurf: null,
          smurfs: res.data
        });
        this.props.history.push("/smurf-list");
      })
      .catch(err => {
        console.log(err);
      });
  };





render() {
  return (
    <div className="App">
      <nav>

        <div className="nav-links">
        <NavLink to="/smurf-form">{`${
              this.state.activeSmurf ? 'Update' : 'Add'
            } Smurf`}</NavLink>

          <NavLink exact to="/">
            Home
          </NavLink>
        </div>
      </nav>

      

      {/* <Route exact path="/" component={Smurfs} /> cHECK LINE 143*/}
      <Route
        exact
        path="/"
        render={props => (
          <Smurfs
            {...props} // this is the same as below
            //               match={props.match}
            //               history={props.history}
            //               location={props.location}
            smurfs={this.state.smurfs}
          />
        )}
      />
      <Route
        path="/smurf-list/:id"
        render={props => (
        // <Smurf {...props} smurfs={this.state.smurfs} />}
        <Smurf
        {...props}
        // deleteItem={this.deleteItem}
        smurfs={this.state.smurfs}
        setUpdateForm={this.setUpdateForm}
      />
    )}
      />

      <Route
      path="/smurf-form/"
      render={props => (
<SmurfForm
              {...props}
              activeSmurf={this.state.activeSmurf}
              addSmurf={this.addSmurf}
              updateSmurf={this.updateSmurf}
            />
          )}
        />
      </div>
    );
  }
}
 

const AppWithRouter = withRouter(App);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  rootElement
);

export default App;
