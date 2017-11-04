import React, { Component } from 'react';
import "./Table.css";

class OutList extends Component {

  render() {
    var rows = [];
    this.props.people.sort(function(a, b) {
      return parseFloat(b.whenOut) - parseFloat(a.whenOut);
    });
    for (var i=0; i<this.props.people.length; i++){
      var person = this.props.people[i];
      if(person.isOut) {
        var date = new Date(person.whenOut);
        var hours = date.getHours();
        var minutes = "" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var year = date.getFullYear();
        var whenOut = month.toString() + "/" + day.toString() + "/" + year.toString() + ", " + hours + ":" + minutes.toString();

        var person_info = [];
        person_info.push(<th>{whenOut}</th>);
        person_info.push(<th>{person.name}</th>);
        rows.push(<tr>{person_info}</tr>);
      }
    };

    console.log(rows);

    return (
      <section>
        <h1>Who&#39;s Out?</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Time Caught</th>
                <th>Name</th>
                {/*<th>Grade</th>*/}
                {/*<th>Tags</th>*/}
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
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
