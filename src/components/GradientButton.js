import React, { Component } from 'react';
import './GradientButton.css';

class GradientButton extends Component {

  render() {
    return (
      <button className='login-button draw-border' onClick={this.props.onClick}>{this.props.buttonText}</button>
    );
  }
}

export default GradientButton;
