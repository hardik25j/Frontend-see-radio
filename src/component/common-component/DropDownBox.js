import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import { FormGroup, Label } from 'reactstrap';

export default function DropDownBox(props) {
  const { isDisabled, list, label, name, isReq, value, onChange, onBlur, error, className } = props;
  return (
    <FormGroup>
      <Label className="font-weight-bold">
        {label}
        {isReq && <span style={{ color: "red" }}> * </span>}
      </Label><br />
      <ReactSelect
        className={className}
        name={name}
        title={label}
        isClearable={true}
        isDisabled={isDisabled}
        options={list}
        value={value}
        onChange={(selectedOption) => {
          let e = {
            target: {
              'name': name,
              'value': selectedOption ? selectedOption : '',
            }
          }
          onChange(e);
        }}
      />
      {error && <span style={{ color: "red" }}> {error} </span>}
    </FormGroup>
  );
}

DropDownBox.defaultProps = {
  isReq: false,
  isDisabled: false
}

DropDownBox.propTypes = {                                                                                                   //when we declare any props which is Required then must be defined their "its default value".
  name: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.node,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
}