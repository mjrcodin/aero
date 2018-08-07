import React, { Component } from "react";
// import { Route, Link, Redirect } from "react-router-dom";
import "./flight-table.css"
import "../App.css";


class FlightTable extends Component {
  constructor() {
    super();
  }


  render() {
    const loggedIn = this.props.loggedIn;
    console.log("flight-table render, props: ");
    console.log(this.props);
    const mapbtn = <button className="mapbtn">Map</button>
    const edit = <button className="edit">Edit</button>
    const cancel = <button className="cancel">Cancel Plan</button>
    return (
      <div>
        
        <p className="test">this is the flight table</p>

        <table class="table table-striped table-hover">
            <thead>
                <tr>
                
                <th scope="col">FAA Reference #</th>
                <th scope="col">Date Submitted</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Operation Begin</th>
                <th scope="col">Duration(hh:mm)</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>

                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">8675309</th>
                <td>07/07/2018</td>
                <td>Mark Otto</td>
                <td>Pending</td>
                <td>08/01/2018</td>
                <td>00:45</td>
                <td>{mapbtn}</td>
                <td>{edit}</td>
                <td>{cancel}</td>

                </tr>
                <tr>
                <th scope="row">8882455</th>
                <td>07/21/2018</td>
                <td>Jacob Thornton</td>
                <td>Approved</td>
                <td>08/05/2018</td>
                <td>05:30</td>
                <td>{mapbtn}</td>
                <td>{edit}</td>
                <td>{cancel}</td>
                </tr>
                <tr>
                <th scope="row">9854685</th>
                <td>07/29/2018</td>
                <td>Jane Smith</td>
                <td>Cancelled</td>
                <td>08/22/2018</td>
                <td>00:15</td>
                <td>{mapbtn}</td>
                <td>{edit}</td>
                <td>{cancel}</td>
                </tr>
                
            </tbody>
            </table>

      </div>
    );
  }
}

export default FlightTable;