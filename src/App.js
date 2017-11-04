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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
