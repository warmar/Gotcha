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
      user: null,
      target: null,
      numTags: null,
      out: null
    };

    this.login = this.login.bind(this);
    this.signOut = this.signOut.bind(this);
    this.gotOut = this.gotOut.bind(this);
    this.registerDatabaseListeners = this.registerDatabaseListeners.bind(this);
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      // Handle Login

      //var token = result.credential.accessToken;
      
      var user = result.user;

      this.setState({
        user: user
      });

      this.registerDatabaseListeners();
    }).catch((error) => {
      // Handle Login Errors
      console.log(error)
    });
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      console.log('Successfully signed out')
      this.setState({
        user: null,
        target: null,
        numTags: null,
        out: null
      });
    }).catch((error) => {
      // An error happened.
      console.log('Error while signing out')
    });
  }

  gotOut() {
    var database = firebase.database()
  }

  registerDatabaseListeners() {
    var database = firebase.database()
    var email = this.state.user.email.replace('.', '')
    // Get Out Status
    database.ref(`/out/${email}`).on('value', (snapshot) => {
      var out = snapshot.val()
      this.setState({
        out: out
      });
    });

    // Get Number of Tags
    database.ref(`/numTags/${email}`).on('value', (snapshot) => {
      var numTags = snapshot.val()
      this.setState({
        numTags: numTags
      });
    });

    // Get Target Email
    database.ref(`/targets/${email}`).on('value', (snapshot) => {
      var targetEmail = snapshot.val()
      database.ref(`/names/${targetEmail}`).on('value', (snapshot) => {
        var targetName = snapshot.val()
        this.setState({
          target: targetName
        });
      });
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
          <br />
          Logged in as: {this.state.user ? this.state.user.email : null}
          <br />
          You are {this.state.out ? null: "not "}out
          <br />
          You have {this.state.numTags} tags
          <br />
          Your target is: {this.state.target}
          <br />
          <button onClick={this.gotOut}>I got out</button>
        </p>
      </div>
    );
  }
}

export default App;
