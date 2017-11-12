import React, { Component } from 'react';
import './SignInButton.css';

class SignInButton extends Component {

  render() {
    return (
      <button className="gradient-button" onClick={this.props.onClick}>{this.props.buttonText}</button>
    );
  }
}

export default SignInButton;
