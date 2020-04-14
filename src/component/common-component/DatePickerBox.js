import React from "react";
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import { FormGroup, Label } from "reactstrap";

export default function DatePickerBox(props) {
  const { onChange, label, placeholder, name, isReq, value, error, dateFormat } = props;
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

DatePickerBox.defaultProps = {
  isReq: false,
  isDisabled: false,
}

DatePickerBox.propTypes = {
  dateFormat: PropTypes.string,
  label: PropTypes.string,                                                                                                   //when we declare any props which is Required then must be defined their "its default value".
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  value: PropTypes.instanceOf(Date),
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
} 