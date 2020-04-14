import React from "react";
import PropTypes from 'prop-types';
import { Row, Col } from "reactstrap";
import InputBox from "../../common-component/InpuxBox";
import { phoneNumberFromatter } from "../../common-component/Validation";

function Contact(props) {
  const { isReq, secondary, firstName, lastName, email, phone, errors, handleChange, onFieldValidate } = props;
  const handlePhone = (e) => {
    let { value } = e.target;
    e.target.value = phoneNumberFromatter(value);
    props.handleChange(e);
  }
  return (
    <>
      <Row>
        <Col>
          <InputBox
            label="First Name"
            type="text"
            name={secondary ? "firstNameSecondary" : "firstName"}
            isReq={isReq}
            placeholder="First Name"
            value={firstName}
            error={secondary ? errors.firstNameSecondary : errors.firstName}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
        <Col>
          <InputBox
            label="Last Name"
            type="text"
            name={secondary ? "lastNameSecondary" : "lastName"}
            isReq={isReq}
            placeholder="Last Name"
            value={lastName}
            error={secondary ? errors.lastNameSecondary : errors.lastName}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputBox
            label="Email"
            type="text"
            name={secondary ? "emailSecondary" : "email"}
            isReq={isReq}
            placeholder="Enter Email"
            value={email}
            error={secondary ? errors.emailSecondary : errors.email}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
        <Col>
          <InputBox
            label="Phone"
            type="text"
            name={secondary ? "phoneSecondary" : "phone"}
            isReq={isReq}
            placeholder="Enter Contact Number"
            value={phone}
            error={secondary ? errors.phoneSecondary : errors.phone}
            onChange={handlePhone}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
    </>
  );
}

export default Contact;

Contact.defaultProps = {
  isReq: false,
  isDisabled: false,
  secondary: false
}
Contact.propTypes = {
  isReq: PropTypes.bool,
  isDisabled: PropTypes.bool,
  secondary: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  onFieldValidate: PropTypes.func
}