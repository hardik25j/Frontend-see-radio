import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { InputBox } from "../common-component/InpuxBox";
import { phoneNumberValidation } from "../common-component/Validation";

class Contact extends Component {
  constructor(props) {
    super(props);
  }

  handlePhone = (e) => {
    let { value } = e.target;
    e.target.value = phoneNumberValidation(value);
    this.props.handleChange(e);
  }

  render() {
    const { isReq, secondary,
      firstName, lastName, email, phone, errors,
      handleChange, onFieldValidate } = this.props;
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
              onChange={this.handlePhone}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
      </>);
  }
}

export default Contact;