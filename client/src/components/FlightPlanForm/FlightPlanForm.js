import React, { Component } from "react";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import TextField from "@material-ui/core/TextField";

class FlightPlanForm extends Component {
  state = {
    selectedDate: new Date(),
    duration: 30,
    altitude: 400,
    radius: 0.5
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSave = event => {
    event.preventDefault();
    console.log("saved flight details");
    this.props.updateFormData(this.state);
    this.props.closeModal();
  };
  handleCancel = () => {
    this.props.closeModal();
  };
  render() {
    const { closeModal } = this.props;
    const { selectedDate } = this.state;
    return (
      <form className="form" noValidate autoComplete="off">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-12">                    
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    label="Start Date and Time"
                    value={selectedDate}
                    onChange={this.handleDateChange}
                    disablePast={true}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="row">
              <div className="col mui-text-field">
                <TextField
                  id="duration"
                  label="Duration"
                  helperText="Enter minutes"
                  type="number"
                  value={this.state.duration}
                  onChange={this.handleChange('duration')}
                  margin="normal"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <TextField
                  id="altitude"
                  label="Max. Altitude"
                  helperText="Enter feet AGL"
                  type="number"
                  value={this.state.altitude}
                  onChange={this.handleChange('altitude')}
                  margin="normal"
                />
              </div>
            </div>
          </div>
        </div>
          {/* <div className="col-4">
            <label htmlFor="radius">
              Radius (if circle)
              <input
                type="number"
                id="radius"
                className="form-control"
                placeholder="Enter miles from center"
                min="0.1"
                max="45"
                step="0.1"
                value={this.state.radius}
                onChange={this.handleChange}
              />
            </label>
          </div> */}
        <button
          type="button"
          className="btn btn-secondary"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.handleSave}
        >
          Save changes
        </button>
      </form>
    );
  }
}

export default FlightPlanForm;
