import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Row, Col } from "reactstrap";
import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';
import { getApi } from '../../../utils/interceptors';
import { toast } from 'react-toastify';
import Axios from "axios";

function Company(props) {
  const { isReq, companyName, companyWebsite, changeDropDown, errors, handleChange, onFieldValidate } = props;
  const [salesPersonList, setSalesPersonList] = useState([]);
  const [industryList, setIndustryList] = useState([]);

  useEffect(() => {
    Axios.all([
      getApi('api/company/persons'),
      getApi('api/wholesalepricing/getIndustries')
    ])
      .then(Axios.spread((personResponse, industryResponse) => {
        let list1 = [];
        let list2 = [];
        personResponse.data.map((item) => {
          const { id, firstName, lastName, email } = item.Person;
          list1 = [...list1, { value: id, label: firstName + " " + lastName + "- " + email }];
          return null;
        })
        industryResponse.data.map((item) => {
          list2.push({ value: item.id, label: item.name });
          return null;
        })
        setSalesPersonList(list1);
        setIndustryList(list2);
      }))
      .catch(response => toast.error(response.errorMessage))
  }, [])

  return (
    <>
      <Row>
        <Col>
          <InputBox
            label="Company Name"
            type="text"
            name="companyName"
            isReq={isReq}
            placeholder="Company Name"
            value={companyName}
            error={errors.companyName}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
        <Col>
          <InputBox
            label="Company Website Address"
            type="text"
            name="companyWebsite"
            isReq={isReq}
            placeholder="www.abc.com"
            value={companyWebsite}
            error={errors.companyWebsite}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <DropDownBox
            label="Salesperson"
            name="salesPerson"
            isReq={isReq}
            list={salesPersonList}
            error={errors.salesPerson}
            onChange={changeDropDown}
          />
        </Col>
        <Col>
          <DropDownBox
            label="Industry Category"
            name="industry"
            isReq={isReq}
            list={industryList}
            error={errors.industry}
            onChange={changeDropDown}
          />
        </Col>
      </Row>
    </>
  );
}

export default Company;

Company.defaultProps = {
  isReq: false,
  isDisabled: false
}

Company.propTypes = {
  isReq: PropTypes.bool,
  isDisabled: PropTypes.bool,
  companyName: PropTypes.string,
  companyWebsite: PropTypes.string,
  industryList: PropTypes.array,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  onFieldValidate: PropTypes.func,
  changeDropDown: PropTypes.func,
}