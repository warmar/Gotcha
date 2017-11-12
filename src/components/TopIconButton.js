import React, { Component } from 'react';
import './TopIconButton.css';

class TopIconButton extends Component {

  render() {
    return (
        <div id={this.props.id} className="top-icon-button">
          <img className="top-icon-button-image centered" alt="Sign Out" src={this.props.image} onClick={this.props.onClick} />
        </div>
    );
  }
}

export default TopIconButton;
