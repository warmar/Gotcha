import React, { Component } from 'react';
import './HelpBox.css';

class HelpBox extends Component {

  render() {
    return (
        <div className="help-box" onClick={this.props.hideHelp}>
            <div className="help-box-content centered">
                <span className="hide-help-button" onClick={this.props.hideHelp}>X</span>
                Rules:
                <br/>
                <br/>
                You can tag in:
                <ul>
                    <li>The Student center</li>
                </ul>

                <br/>
                You can NOT tag in:
                <ul>
                    <li>Classrooms</li>
                </ul>

                <br/>
                <br/>

                Created By Peter Marangos
                <br/>
                <br/>
                With help from these people:
                <br/>
                Jeffrey Cao, Zoe Camaya, Zac Mustin, Max Hui
                <br/>
                <br/>
                P.S. Sorry that this info page is so ugly I had like 0 time to make a nicer one.
            </div>
        </div>
    );
  }
}

export default HelpBox;
