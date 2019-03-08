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
      .then(response => this.setState({ smurfs: response.data }))
      .catch(error => console.log(error));
  }
  

  


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
      .put(`http://localhost:5000/smurfs${smurf.id}`, smurf)
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




//   render() {
//     return (
//       <div className="App">
//         <SmurfForm />
//         <Smurfs smurfs={this.state.smurfs} />
//       </div>
//     );
//   }
// }


//   render() {
//     return (
//       <div className="App">
//       <nav>
//       <h1 className="smurf-form">Smurf Form</h1>
//        <div className="nav-links">
//        <NavLink exact to="/">
//        Smurf Form
//        </NavLink>

//         <SmurfForm />
//         <Smurfs smurfs={this.state.smurfs} />
//         <NavLink to="/smurf-list">Smurfs</NavLink>
//         <SmurfForm />
//         <Smurfs smurfs={this.state.smurfs} />
//         </div>
//         </nav>
//       </div>
//     );
//   }
// }


render() {
  return (
    <div className="App">
      <nav>
        {/* <h1 className="smurf-header">Smurf List</h1> */}
        <div className="nav-links">
          <NavLink exact to="/">
            Home
          </NavLink>
          <NavLink to="/smurf-list">New Smurf</NavLink>
          {/* <SmurfForm />
         <Smurfs smurfs={this.state.smurfs} /> */}
        </div>
      </nav>

      {/* <Route exact path="/" component={Smurfs} /> */}
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
        render={props => <Smurf {...props} smurfs={this.state.smurfs} />}
      />

      <Route
      path="/smurf-form/"
      />
   </div>
  );
}
} 

const AppWithRouter = withRouter(App);
// export default withRouter(Component);

const rootElement = document.getElementById('root');
ReactDOM.render(
  <Router>
    <AppWithRouter />
  </Router>,
  rootElement
);

export default App;
