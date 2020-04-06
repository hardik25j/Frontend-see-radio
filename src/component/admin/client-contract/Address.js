import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Row, Col } from "reactstrap";
import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';
import { getApi } from '../../../utils/interceptors';
import { toast } from 'react-toastify';

export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: ''
    }
    this.stateProvinceList = [];
    this.countryList = [
      { value: "CA", label: "Canada" },
      { value: "US", label: "United States" },
    ];
  }
  handleCountry = (e) => {
    const { value } = e.target;
    this.stateProvinceList = [];
    this.setState({ country: value });
    value
      ? getApi(`pub/states/${e.target.value.value}`)
        .then(response => {
          response.data.map((item) => {
            const { name, code, id } = item;
            this.stateProvinceList = [...this.stateProvinceList, { value: code, label: name, id }]
            return null;
          })
          this.props.changeDropDown(e);
        })
        .catch(response => toast.error(response.errorMessage))
      : this.props.changeDropDown(e);
  }
  render() {
    const { isDisabled, secondary, address1, address2, city, country, changeDropDown,
      stateProvince, postal, errors, handleChange, onFieldValidate } = this.props;
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
              error={isDisabled ? null : secondary ? errors.address1Secondary : errors.address1}
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
              error={isDisabled ? null : secondary ? errors.address2Secondary : errors.address2}
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
              error={isDisabled ? null : secondary ? errors.citySecondary : errors.city}
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
              list={this.countryList}
              value={country}
              error={isDisabled ? null : secondary ? errors.countrySecondary : errors.country}
              onChange={this.handleCountry}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DropDownBox
              label={country ? `${country.value === 'CA' ? 'Province' : 'State'}` : 'State/Province'}
              name={secondary ? "stateProvinceSecondary" : "stateProvince"}
              isReq={true}
              isDisabled={isDisabled ? true : !country}
              list={this.stateProvinceList}
              value={stateProvince}
              error={isDisabled ? null : secondary ? errors.stateProvinceSecondary : errors.stateProvince}
              onChange={changeDropDown}
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
              error={isDisabled ? null : secondary ? errors.postalSecondary : errors.postal}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
      </>
    );
  }
}

Address.defaultProps = {
  isReq: false,
  isDisabled: false,
  secondary: false
}

Address.propTypes = {
  isReq: PropTypes.bool,
  secondary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  address1: PropTypes.string,
  address2: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.object,
  stateProvince: PropTypes.object,
  postal: PropTypes.string,
  errors: PropTypes.object,
  changeDropDown: PropTypes.func,
  handleChange: PropTypes.func,
  onFieldValidate: PropTypes.func
}