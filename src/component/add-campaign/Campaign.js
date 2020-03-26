import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { DropDownBox, InputBox } from "../common-component/InpuxBox";
import { getApi } from "../../utils/interceptors";
import { toast } from "react-toastify";

export default class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.salesPersonList = [];
    this.advertiserList = [];
  }
  componentDidMount() {
    getApi('api/company/persons')
      .then(response => {
        response.data.map((item) => {
          const { salesOrgCompanyID } = item;
          const { id, firstName, lastName } = item.Person;
          this.salesPersonList.push({ value: id, label: firstName + " " + lastName, salesOrgCompanyID });
        })
        console.log(response);
      })
      .then(
        getApi(`api/company/salesOrg/clients/${localStorage.companyId}`)
          .then(response => {
            response.data.map((item) => {
              const { id, companyName, companyWebsite } = item;
              this.advertiserList.push({ value: id, label: companyName, webSite: companyWebsite });
            })
          })
      )
      .catch(response => toast.error(response.errorMessage))
  }
  render() {
    const { isReq, data, errors, handleChange, onFieldValidate, changeDropDown } = this.props;
    const { salesPerson, advertiser, title, URL, price, description } = data;
    return (
      <>
        <Row>
          <Col>
            <DropDownBox
              label="Sales Person"
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
              label="Advertiser"
              name="advertiser"
              isReq={isReq}
              list={this.advertiserList}
              value={advertiser}
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
}