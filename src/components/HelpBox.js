import React, { Component } from 'react';
import './HelpBox.css';

class HelpBox extends Component {

  render() {
    return (
        <div className="help-box" onClick={this.props.hideHelp}>
            <div className="help-box-content">
                <span className="hide-help-button" onClick={this.props.hideHelp}>X</span>
                Rules:
                <br/>
                <br/>
                Tagging must be between 8:20 AM and 4:00 PM
                <br/>
                Except Monday (between 10:15 AM and 4:00 PM)
                <br/>
                <br/>
                You can NOT tag in:
                <ul>
                <li>Sidewalks or any areas near streets or cars (parking lots included)</li>
                <li>Classrooms</li>
                <li>All of Ware</li>
                <li>Dining Halls</li>
                <li>The Library</li>
                <li>All Bathrooms</li>
                <li>Dorms</li>
                <li>Quad between Ware and Library</li>
                <li>The Weight Room</li>
                <li>Admissions Hallway</li>
                <li>Pritzker</li>
                <li>Lockerrooms</li>
                <li>The walkway between the student center and forbes during 4th-6th period on Oxfam day (November 14th)</li>
                </ul>

                <br/>
                Banned Behavior:
                <ul>
                <li>No excessive physicality (no injuring anyone)</li>
                <li>No barricading</li>
                <li>No taking others' possessions hostage</li>
                <li>No taking hostages</li>
                <li>No bribes</li>
                <li>No missing classes</li>
                <li>No disrupting classes</li>
                <li>No running near streets or sidewalks</li>
                </ul>
                <br/>
                <br/>

                Created By Peter Marangos with help from Mr. Hales
                <br/>
                and these people:
                <br/>
                Jeffrey Cao, Zoe Camaya, Zac Mustin, Max Hui
                <br/>
                <br/>
                If you have any problems, please contact warwick_marangos18@milton.edu
                <br/>
                <br/>
                P.S. Sorry that this info page is so ugly I had like 0 time to make a nicer one.
            </div>
        </div>
    );
  }
}

export default HelpBox;
