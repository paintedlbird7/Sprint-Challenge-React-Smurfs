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
  
  addSmurf = (e, smurf) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(res => {
        this.setState({
          smurfs: res.data
        });
        this.props.history.push("/smurf-list");
      })
      .catch(err => {
        console.log(err);
      });
  };
  


  setUpdateForm = (e, friend) => {
    e.preventDefault();
    this.setState({
      activeFriend: friend
    });
    this.props.history.push("/friend-form");
  };
  


  updateFriend = (e, friend) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/friends${friend.id}`, friend)
      .then(res => {
        this.setState({
          activeFriend: null,
          friends: res.data
        });
        this.props.history.push("/friend-list");
      })
      .catch(err => {
        console.log(err);
      });
  };




  render() {
    return (
      <div className="App">
        <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}



// render() {
//   return (
//     <div className="App">
//       <nav>
//         <h1 className="smurf-header">Lambda Friend List</h1>
//         <div className="nav-links">
//           <NavLink exact to="/">
//             Home
//           </NavLink>
//           <NavLink to="/smurf-list">Friends</NavLink>
//           <SmurfForm />
// //         <Smurfs smurfs={this.state.smurfs} />
//         </div>
//       </nav>

//       <Route exact path="/" component={Smurfs} />
//       <Route
//         exact
//         path="/smurf-list"
//         render={props => (
//           <SmurfsList
//             {...props} // this is the same as below
//             //               match={props.match}
//             //               history={props.history}
//             //               location={props.location}
//             smurfs={this.state.smurfs}
//           />
//         )}
//       />
//       <Route
//         path="/smurf-list/:id"
//         render={props => <Smurf {...props} smurfs={this.state.smurfs} />}
//       />
//    </div>
//   );
// }
// } */}


export default App;
