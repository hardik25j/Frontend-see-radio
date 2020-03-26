import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { FormGroup, Label } from "reactstrap";

export default class DatePickerBox extends Component {
  render() {
    const {
      onChange, label, placeholder, name, isReq, value, error, dateFormat
    } = this.props;
    return (
      <>
        <FormGroup>
          <Label className="font-weight-bold">
            {label}
            {isReq && <span style={{ color: "red" }}> * </span>}
          </Label><br />
          <DatePicker className="form-control"
            placeholderText={placeholder}
            dateFormat={dateFormat}
            selected={value}
            onChange={(date) => onChange(date, name)}
          />
          {error && <span style={{ color: "red" }}> {error} </span>}
        </FormGroup >
      </>
    );
  }
}