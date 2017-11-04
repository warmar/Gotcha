import React, { Component } from 'react';
import './LoginButton.css';

class LoginButton extends Component {

  render() {
    return (
        <div className='centered'>
          <button className='login-button draw-border' onClick={this.props.login}>Log In</button>
        </div>
    );
  }
}

export default LoginButton;
