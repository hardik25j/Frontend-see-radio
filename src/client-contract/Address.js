import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, FormGroup } from "reactstrap";
import { InputBox, DropDownBox } from "../common-component/InpuxBox";

class Address extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    const {
      address1, address2, city, country,
      stateProvince, postal, errors, stateProvinceList,
      handleCountry, countryList, handleChange, onFieldValidate
    } = this.props;

    return (
      <>
        <Row>
          <Col>
            <InputBox
              label="Address"
              type="text"
              name="address1"
              isReq={true}
              placeholder="Enter Address"
              value={address1}
              error={errors.address1}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
          <Col>
            <InputBox
              label="Address line 2"
              type="text"
              name="address2"
              placeholder="Enter Address"
              value={address2}
              error={errors.address2}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <InputBox
              label="City"
              type="text"
              name="city"
              isReq={true}
              placeholder="Enter City"
              value={city}
              error={errors.city}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
          <Col>
            <DropDownBox
              label="Country"
              name="country"
              isReq={true}
              list={countryList}
              value={country}
              error={errors.country}
              onChange={handleCountry}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DropDownBox
              label={country ? `${country == 'CA' ? 'Province' : 'State'}` : 'State/Province'}
              name="stateProvince"
              isReq={true}
              isDisabled={!country}
              list={stateProvinceList}
              value={stateProvince}
              error={errors.stateProvince}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
          <Col>
            <InputBox
              label="Postal"
              type="text"
              name="postal"
              isReq={true}
              placeholder="Enter Postal Code"
              value={postal}
              error={errors.postal}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Address;