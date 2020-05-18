import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Row, Col } from "reactstrap";
import { toast } from "react-toastify";
import Axios from "axios";

import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';
import { getApi } from "../../../utils/interceptors";

function Campaign(props) {
  const { isReq, data, errors, handleChange, onFieldValidate, changeDropDown } = props;
  const { title, URL, price, description } = data;
  const [salesPersonList, setSalesPersonList] = useState([]);
  const [advertiserList, setAdvertiserList] = useState([]);
 
  useEffect(() => {
    Axios.all([
      getApi('api/company/persons'),
      getApi(`api/company/salesOrg/clients/${localStorage.companyId}`)
    ])
      .then(Axios.spread((personResponse, clientsResponse) => {
        let list1 = [];
        let list2 = [];
        personResponse.data.map((item) => {
          const { salesOrgCompanyID } = item;
          const { id, firstName, lastName } = item.Person;
          list1 = [...list1, { value: id, label: firstName + " " + lastName, salesOrgCompanyID }];
          return null;
        })
        clientsResponse.data.map((item) => {
          const { id, companyName, companyWebsite } = item;
          list2 = [...list2, { value: id, label: companyName, webSite: companyWebsite }];
          return null;
        })
        setSalesPersonList(list1);
        setAdvertiserList(list2);
      }))
      .catch(response => toast.error(response.errorMessage))
  }, [])

  return (
    <>
      <Row>
        <Col>
          <DropDownBox
            label="Sales Person"
            name="salesPerson"
            isReq={isReq}
            list={salesPersonList}
            error={errors.salesPerson}
            onChange={changeDropDown}
          />
        </Col>
        <Col>
          <DropDownBox
            label="Advertiser"
            name="advertiser"
            isReq={isReq}
            list={advertiserList}
            error={errors.advertiser}
            onChange={changeDropDown}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputBox
            label="Title"
            name="title"
            type="text"
            isReq={isReq}
            placeholder="Title"
            value={title}
            error={errors.title}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
        <Col>
          <InputBox
            label="Preferred Landing Page URL"
            name="URL"
            type="text"
            isReq={isReq}
            placeholder="www.abc.com"
            value={URL}
            error={errors.URL}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <InputBox
            label="Price"
            name="price"
            type="text"
            isReq={isReq}
            placeholder="price"
            value={price}
            error={errors.price}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
        <Col>
          <InputBox
            label="Description"
            name="description"
            type="textarea"
            isReq={isReq}
            placeholder="Description"
            value={description}
            error={errors.description}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
    </>
  );
}

export default Campaign;

Campaign.defaultProps = {
  isReq: false,
  isDisabled: false
}
Campaign.propTypes = {
  isReq: PropTypes.bool,
  isDisabled: PropTypes.bool,
  data: PropTypes.object,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  onFieldValidate: PropTypes.func,
  changeDropDown: PropTypes.func
}