import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import OutButton from './components/OutButton';
import SignInButton from './components/SignInButton';
import TopIconButton from './components/TopIconButton';
import HelpBox from './components/HelpBox';
import Leaderboard from './components/Leaderboard';
import OutList from './components/OutList';

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
  defaultState(){
    return {
      user: null,
      unknownUser: null,
      target: null,
      numTags: null,
      out: null,
      names: null,
      classes: null,
      outPeople: [],
      leaders: [],
      numTotal: null,
      numOut: null,
      help: false
    }
  }

  constructor(props) {
    super(props);
    this.state = this.defaultState();

    this.contactEmail = "warwick_marangos18@milton.edu"

    this.login = this.login.bind(this);
    this.signOut = this.signOut.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.hideHelp = this.hideHelp.bind(this);
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
      this.setState(this.defaultState());
    }).catch((error) => {
      // An error happened.
      console.log('Error while signing out')
    });
  }

  showHelp() {
    this.setState({
      help: true
    })
  }

  hideHelp() {
    this.setState({
      help: false
    })
  }

  gotOut() {
    if (window.confirm("Are you sure you want to get out?")){
      if (window.confirm("Are you absolutely sure? (This is irreversible)")){
        var database = firebase.database();
        return database.ref(`/gotout/${this.state.user.email.replace(/\./g, '')}`).set(true)
      }
    }
  }

  registerDatabaseListeners() {
    var database = firebase.database();
    var email = this.state.user.email.replace(/\./g, '');

    // Get Out Status
    database.ref(`/out/${email}`).on('value', (snapshot) => {
      var out = snapshot.val()

      // Check if user is known
      if (out === null){
        this.setState({
          unknownUser: true
        });
      }

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

      // Get Target Name
      database.ref(`/names/${targetEmail}`).on('value', (snapshot) => {
        var targetName = snapshot.val()
        this.setState({
          target: targetName
        });
      });
    });

    // Get All Names
    database.ref('/names').once('value').then((snapshot) => {
      const names = snapshot.val();
      this.setState({
        names: names
      });
    });

    // Get All Classes
    database.ref('/classes').once('value').then((snapshot) => {
      const classes = snapshot.val();
      this.setState({
        classes: classes
      });
    });

    // Leaders and Outs
    database.ref('/numTags').on('value', (snapshot) => {
      // Leaders
      const peopleNumTags = snapshot.val();

      // Outs
      database.ref('/tags').once('value').then((snapshot) => {
        // Update Out List
        const tags = snapshot.val();
  
        if (!tags) {
          return null;
        }
  
        var outPeople = [];
        var numOut = 0;
        for (var key in tags) {
          const tag = tags[key];
          const taggedEmail = tag.tagged;
          const classString = {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV'
          }[this.state.classes[taggedEmail]]
  
          outPeople.push({
            email: taggedEmail,
            name: this.state.names[taggedEmail],
            class: classString,
            timestamp: tag.timestamp
          });
          numOut++;
        }
        this.setState({
          outPeople: outPeople,
          numOut: numOut
        });

        // Update Leaderboard
        if (!peopleNumTags) {
          return null;
        }
  
        var leaders = [];
        var numTotal = 0;
        for (var email in peopleNumTags) {
          const numTags = peopleNumTags[email];
          numTotal++;
  
          // Only display people with at least 1 tag
          if (!numTags > 0){
            continue;
          }

          // Don't display people who are out
          var out = false;
          for (var i=0; i<this.state.outPeople.length; i++){
            if (email === this.state.outPeople[i].email){
              out = true;
              break;
            }
          }
          if (out){
            continue;
          }
  
          const classString = {
            1: 'I',
            2: 'II',
            3: 'III',
            4: 'IV'
          }[this.state.classes[email]]
  
          leaders.push({
            name: this.state.names[email],
            class: classString,
            tags: numTags
          });
        }
        this.setState({
          leaders: leaders,
          numTotal: numTotal
        });
      });
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

    var unknownUser = null;
    if (this.state.unknownUser === true) {
      unknownUser = 
      <div style={{fontSize: '0.7em'}}>
        <br/>
        Sorry, you are not on the list.
        <br/>
        Please contact
        <br/>
        {this.contactEmail}
        <br/>
        if you believe this is an error.
      </div>
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
        Your target is:
        <br/>
        {this.state.target}
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

    
    
    // Num Out
    var numOutText = null;
    if (this.state.user !== null) {
      numOutText = 
        <div>
          <br/>
          There are {this.state.numOut} out of {this.state.numTotal} people out.
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
              <source src={require('./images/new-background-video.webm')} type="video/webm" />
            </video>
          </div>

          <div className="main-body-content">
            {this.state.help ? <HelpBox hideHelp={this.hideHelp} contactEmail={this.contactEmail} /> : null}
            {signInButton}
            {helpButton}
            {signOutButton}
            <div className="info-box">
              {loggedIn}
              {unknownUser}
              {out}
              {numTags}
              {target}
              {outButton}
              <br/>
              {(this.state.user === null) ? null : <Leaderboard people={this.state.leaders} />}
              {(this.state.user === null) ? null : <OutList people={this.state.outPeople} />}
              {numOutText}
              <br/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
