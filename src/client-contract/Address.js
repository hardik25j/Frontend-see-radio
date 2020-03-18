import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { InputBox, DropDownBox } from "../common-component/InpuxBox";
import { getApi } from '../utils/interceptors';
import { toast } from 'react-toastify';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: ''
    }
    this.stateProvinceList = [];
  }

  handleCountry = (e) => {
    const { name, value } = e.target;
    this.stateProvinceList = [];
    this.setState({ [name]: value });
    getApi(`pub/states/${e.target.value}`)
      .then(response => {
        response.data.map((item) => {
          const { name, code } = item;
          this.stateProvinceList = [...this.stateProvinceList, { value: code, label: name }]
        })
      })
      .catch(response => toast.error(response.errorMessage))
    this.props.handleChange(e);
  }

  render() {
    const {
      isDisabled, secondary, address1, address2, city, country,
      stateProvince, postal, errors, countryList, handleChange, onFieldValidate
    } = this.props;

    return (
      <>
        <Row>
          <Col>
            <InputBox
              label="Address"
              type="text"
              name={secondary ? "address1Secondary" : "address1"}
              isReq={true}
              isDisabled={isDisabled}
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
              name={secondary ? "address2Secondary" : "address2"}
              isDisabled={isDisabled}
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
              name={secondary ? "citySecondary" : "city"}
              isReq={true}
              isDisabled={isDisabled}
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
              name={secondary ? "countrySecondary" : "country"}
              isReq={true}
              isDisabled={isDisabled}
              list={countryList}
              value={country}
              error={errors.country}
              onChange={this.handleCountry}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DropDownBox
              label={country.value ? `${country.value == 'CA' ? 'Province' : 'State'}` : 'State/Province'}
              name={secondary ? "stateProvinceSecondary" : "stateProvince"}
              isReq={true}
              isDisabled={isDisabled ? true : !country}
              list={this.stateProvinceList}
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
              name={secondary ? "postalSecondary" : "postal"}
              isReq={true}
              isDisabled={isDisabled}
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