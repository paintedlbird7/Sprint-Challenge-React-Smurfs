import React, { Component } from 'react';

import axios from "axios";


class SmurfForm extends React.Component {
  state = {
    smurf: this.props.activeSmurf || {
        name: '',
              age: '',
              height: ''
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.activeSmurf &&
      prevProps.activeSmurf !== this.props.activeSmurf
    ) {
      this.setState({
        smurf: this.props.activeSmurf
      });
    }
  }

  changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === 'price') {
      value = parseInt(value, 10);
    }
    // We have a nested object on state - Here are the steps to update
    // a single property on that nested object

    // Inside setState, we want to update "item" with a new object
    // Spread in the properties from the old "item" object - ...this.state.item
    // update the one field we are trying to update

    // this.setState({
    //   item: {
    //     ...this.state.item,
    //     [ev.target.name]: ev.target.value
    //   }
    // });

    this.setState(prevState => ({
      smurf: {
        ...prevState.smurf,
        [ev.target.name]: value
      }
    }));
  };

  handleSubmit = e => {
    if (this.props.activeSmurf) {
      this.props.updateSmurf(e, this.state.smurf);
    } else {
      this.props.addSmurf(e, this.state.smurf);
    }
    this.setState({
      smurf: {
        name: '',
              age: '',
              height: ''
      }
    });
  };


// class SmurfForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//       age: '',
//       height: ''
//     };
//   }

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

//   addSmurf = (event, smurf) => {
//     event.preventDefault();
//     // add code to create the smurf using the api
//     // look in App.js 
  
//       axios
//         .post("http://localhost:3333/smurf", smurf)
//         .then(res => {
//           this.setState({
//             smurfs: res.data
//           });
//           this.props.history.push("/smurf-list");
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     };

  //   this.setState({
  //     name: '',
  //     age: '',
  //     height: ''
  //   });
  // }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
              <h2>{`${this.props.activeItem ? 'Update' : 'Add New'} Item`}</h2>
              <form onSubmit={this.handleSubmit}>
        {/* <form onSubmit={this.addSmurf}> */}
          <input
                      type="string"
            // onChange={this.handleInputChange}
            onChange={this.changeHandler}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
                      onChange={this.changeHandler}

            // onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
                      onChange={this.changeHandler}

            // onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
