import React, { Component } from 'react';
import "./OutList.css";

class OutList extends Component {

  render() {
    // Sort people by timestamp
    this.props.people.sort(function(a, b) {
      return b.timestamp - a.timestamp;
    });
    
    var rows = [];
    for (var i=0; i<this.props.people.length; i++){
      var person = this.props.people[i];

      var date = new Date(person.timestamp);
      var hours = date.getHours();
      var minutes = date.getMinutes();

      if (minutes.toString().length === 1) {
        minutes = '0' + minutes;
      }

      var month = date.getMonth() + 1;
      var day = date.getDate();
      var year = date.getFullYear();
      var timestampString = month.toString() + "/" + day.toString() + "/" + year.toString() + ", " + hours + ":" + minutes.toString();

      var person_info = [];
      person_info.push(<th>{timestampString}</th>);
      person_info.push(<th>{person.name}</th>);
      person_info.push(<th>{person.class}</th>);
      rows.push(<tr>{person_info}</tr>);
    };

    return (
      <section>
        <h1>Who's Out?</h1>
        <div className="outlist-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Time</th>
                <th>Name</th>
                <th>Class</th>
                {/*<th>Tags</th>*/}
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


export default OutList;
