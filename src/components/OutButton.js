import React, { Component } from 'react';
import './OutButton.css';

class OutButton extends Component {

  render() {
    return (
        <button className='out-button' onClick={this.props.gotOut}>I got out</button>
    );
  }
}

export default OutButton;
