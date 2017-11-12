import React, { Component } from 'react';
import "./Leaderboard.css";

class Leaderboard extends Component {

  render() {
    // Sort people by tags
    this.props.people.sort(function(a, b) {
      return b.tags - a.tags;
    });
    
    var rows = [];
    for (var i=0; i<this.props.people.length; i++){
      var person = this.props.people[i];

      var person_info = [];
      person_info.push(<th>{person.name}</th>);
      person_info.push(<th>{person.class}</th>);
      person_info.push(<th>{person.tags}</th>);
      rows.push(<tr>{person_info}</tr>);
    };

    return (
      <section>
        <h1>Leaderboard</h1>
        <div className="outlist-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Tags</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="outlist-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

}


export default Leaderboard;
