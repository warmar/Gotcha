import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import OutButton from './components/OutButton';
import SignInButton from './components/SignInButton';
import TopIconButton from './components/TopIconButton';
//import OutList from './components/OutList';

var config = {
  apiKey: "AIzaSyCpxiNaL8jD0uvTZvEsM_hD9VF_pDSD5o0",
  authDomain: "magotcha2017.firebaseapp.com",
  databaseURL: "https://magotcha2017.firebaseio.com",
  projectId: "magotcha2017",
  storageBucket: "magotcha2017.appspot.com",
  messagingSenderId: "869056738532"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      target: null,
      numTags: null,
      out: null,
      people: []
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

  showHelp() {
    //TODO: SHOW HELP PAGE
    alert('help.');
  }

  gotOut() {
    var database = firebase.database();
    return database.ref(`/gotout/${this.state.user.email.replace('.', '')}`).set(true);
  }

  registerDatabaseListeners() {
    var database = firebase.database();
    var email = this.state.user.email.replace('.', '');
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

    // Outs Table
    database.ref('/tags').on('value', (snapshot) => {
      var tags = snapshot.val();

      if (!tags) {
        return null;
      }

      var people = []
      var promises = []

      for (var key in tags) {
        var person = tags[key];
        var taggedEmail = person.tagged
        promises.push(
          database.ref(`/names/${taggedEmail}`).once('value').then((snap) => {
            var name = snap.val();
            var timestamp = person.timestamp;
            people.push({
              name: name,
              whenOut: timestamp,
              isOut: true
            });
          })
        );
      }

      Promise.all(promises).then(() => {        
        this.setState({
          people: people
        });
        console.log(people);
      })
    });
  }

  render() {
    // Login Button
    var signInButton = null;
    if (this.state.user === null) {
      //loginButton = <button onClick={this.login}>Login</button>
      signInButton = <SignInButton onClick={this.login} buttonText="Log In" />
    }
 
    // Sign Out Button
    var signOutButton = null;
    if (this.state.user !== null) {
      signOutButton = <TopIconButton id="sign-out-button" onClick={this.signOut} image={require('./images/sign-out-icon.png')} />
    }

    var helpButton = null;
    if (this.state.user !== null) {
      helpButton = <TopIconButton id="help-button" onClick={this.showHelp} image={require('./images/help-icon.png')} />
    }

    // Logged In
    var loggedIn = null;
    if (this.state.user !== null) {
      loggedIn = 
      <div>
        Logged in as:
        <br/>
        {this.state.user.displayName}
      </div>;
    }

    // Out
    var out = null;
    if (this.state.out === true) {
      out = 
      <div>
        <br/>
        You are out
      </div>;
    }

    // Number of Tags
    var numTags = null;
    if (this.state.numTags !== null) {
      numTags = 
      <div>
        <br/>
        You have {this.state.numTags} tags
      </div>;
    }
    
    // Target
    var target = null;
    if (this.state.target !== null) {
      target = 
      <div>
        <br/>
        Your target is: {this.state.target}
      </div>;
    }

    // Out Button
    var outButton = null;
    if (this.state.out !== null && !this.state.out) {
      outButton =
        <div>
          <br/>
          <OutButton gotOut={this.gotOut} />
        </div>;
    }

    return (
      <div className="App">
        <div className="title-bar">
          <span className="title-text centered">Gotcha</span>
        </div>
        <div className="main-body">
          <div className="main-body-background">
            <video className="background-video" poster={require('./images/background-poster.jpg')} autoPlay loop muted playsInline>
              <source src={require('./images/background-video.mp4')} type="video/mp4" />
            </video>
          </div>

          {signInButton}
          {helpButton}
          {signOutButton}
          <div className="info-box">
            {loggedIn}
            {out}
            {numTags}
            {target}
            {outButton}
            {/*(this.state.user === null) ? null : <OutList people={this.state.people} />*/}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
