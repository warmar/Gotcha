import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDEc-iwuIh_WC-QZ6en4VdKXel6MR1kNAE",
  authDomain: "gotchahacknehs.firebaseapp.com",
  databaseURL: "https://gotchahacknehs.firebaseio.com",
  projectId: "gotchahacknehs",
  storageBucket: "gotchahacknehs.appspot.com",
  messagingSenderId: "729750595858"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null
    };

    this.login = this.login.bind(this);
    this.signOut = this.signOut.bind(this);
    this.gotOut = this.gotOut.bind(this);
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // Handle Login

      //var token = result.credential.accessToken;
      
      var user = result.user;

      this.setState({
        email: user.email
      });
    }).catch((error) => {
      // Handle Login Errors
      console.log(error)
    });
  }

  gotOut() {

  }

  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Successfully signed out')
      this.setState({
        email: null
      });
    }).catch((error) => {
      // An error happened.
      console.log('Error while signing out')
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Gotcha</h1>
        </header>
        <p className="App-intro">
          <button onClick={this.login}>Login</button>
          <button onClick={this.signOut}>Sign Out</button>
          {this.state.email}
        </p>
      </div>
    );
  }
}

export default App;
