import React, { Component } from 'react';
import './TopIconButton.css';

class TopIconButton extends Component {

  render() {
    return (
        <div id={this.props.id} className="top-icon-button" onClick={this.props.onClick}>
          <img className="top-icon-button-image centered" alt={this.props.id} src={this.props.image} />
        </div>
    );
  }
}

export default TopIconButton;
