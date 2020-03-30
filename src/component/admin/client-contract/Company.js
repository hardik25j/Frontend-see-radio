import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { InputBox, DropDownBox } from "../../common-component/InpuxBox";
import { getApi } from '../../../utils/interceptors';
import { toast } from 'react-toastify';

export default class Company extends Component {
  constructor(props) {
    super(props);
    this.salesPersonList = [];
    this.industryList = [];
  }
  componentDidMount() {
    getApi('api/company/persons')
      .then(response => {
        response.data.map((item) => {
          const { id, firstName, lastName, email } = item.Person;
          this.salesPersonList.push({ value: id, label: firstName + " " + lastName + "- " + email });
        })
      })
      .then(
        getApi('api/wholesalepricing/getIndustries')
          .then(response => {
            response.data.map((item) => {
              this.industryList.push({ value: item.id, label: item.name });
            })
          })
      )
      .catch(response => toast.error(response.errorMessage))
  }
  render() {
    const { isReq, companyName, companyWebsite, salesPerson, changeDropDown, industry, errors,
      handleChange, onFieldValidate } = this.props;
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
              list={this.salesPersonList}
              value={salesPerson}
              error={errors.salesPerson}
              onChange={changeDropDown}
            />
          </Col>
          <Col>
            <DropDownBox
              label="Industry Category"
              name="industry"
              isReq={isReq}
              list={this.industryList}
              value={industry}
              error={errors.industry}
              onChange={changeDropDown}
            />
          </Col>
        </Row>
      </>
    );
  }
}