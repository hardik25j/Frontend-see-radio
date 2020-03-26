import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Campaign from "./Campaign";
import Distribution from "./Distribution";
import { InputBox } from "../common-component/InpuxBox";
import { checkValidation, setterErrorMsg } from "../common-component/Validation";
import { postApi } from "../../utils/interceptors";
import { toast } from "react-toastify";


export default class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        salesPerson: '',
        advertiser: '',
        title: '',
        URL: '',
        price: '',
        description: '',
        targetMarket: '',
        views: '',
        startDate: '',
        endDate: '',
        timeSpan: '',
        duration: '',
      },
      errors: {}
    };
  }

  handleChange = (e) => {
    const { form } = this.state;
    const { name, value } = e.target;
    form[name] = value;
    this.setState({ form });
  };
  changeDropDown = (e) => {
    const { errors } = this.state;
    const { name, value } = e.target;
    let errorMsg = "";
    if (!value)
      errorMsg = `Please Select.`;
    errors[name] = errorMsg;
    this.setState({ errors }, () => this.handleChange(e));
  }
  changeDate = (date, name) => {
    const { form } = this.state;
    console.log(date);
    this.setState({
      form: { ...form, [name]: date }
    });
  }
  onFieldValidate = (e) => {
    const { errors } = this.state;
    const { name } = e.target;
    errors[name] = setterErrorMsg(e);
    this.setState({ errors });
  };
  cleanForm = () => {
    const { form } = this.state;
    Object.keys(form).map((key) => {
      form[key] = '';
    })
    this.setState({ errors: {}, form });
  };
  onSubmitForm = () => {
    const { form, errors } = this.state;
    const notReq = ['timeSpan', 'duration'];
    const validationError = checkValidation(errors, form, notReq);

    if (Object.keys(validationError).length !== 0)
      this.setState({ errors: validationError });
    else {
      const objData = this.setterData();
      postApi('api/campaign/', objData)
        .then(() => {
          toast.success("form submitted");
        })
        .catch(response => toast.error(response.errorMessage))
    }
  };
  setterData = () => {
    const { userId } = localStorage;
    const { form } = this.state;
    const { salesPerson, advertiser, title, URL, price, description,
      targetMarket, views, startDate, endDate } = form;
    const obj = {
      clientCompanyID: advertiser.value,
      title: title,
      description: description,
      landingpageURL: URL,
      targetMarket: targetMarket.value,
      endDate: endDate,
      views: views,
      startDate: startDate,
      price: price,
      soaID: localStorage.userId,
      sosID: salesPerson.value,
      salesOrgCompanyID: salesPerson.salesOrgCompanyID,
      statusByPersonID: userId,
      statusWithPersonID: userId,
    }
    return obj;
  }
  render() {
    const { form, errors } = this.state;
    return (
      <>
        <Row className="d-flex justify-content-center">
          <Col lg="11" className="mt-5 px-4">
            <div className="title-header">Add New Campaign</div>
            <Card >
              <CardBody>

                <div className="form-title">Campaign</div>
                <Campaign
                  isReq={true}
                  data={form}
                  errors={errors}
                  onChange={this.onChange}
                  handleChange={this.handleChange}
                  changeDropDown={this.changeDropDown}
                  onFieldValidate={this.onFieldValidate}
                />

                <div className="form-title">Distribution</div>
                <Distribution
                  isReq={true}
                  data={form}
                  errors={errors}
                  onChange={this.onChange}
                  handleChange={this.handleChange}
                  changeDropDown={this.changeDropDown}
                  changeDate={this.changeDate}
                  onFieldValidate={this.onFieldValidate}
                />
                <Row className="sumbmit-buttons">
                  <InputBox
                    type="button"
                    name="cancel"
                    className="btn btn-outline-secondary button"
                    value="Cancel"
                    onClick={this.cleanForm}
                  />
                  <InputBox
                    type="button"
                    name="next"
                    className="btn btn-primary button"
                    value="Next"
                    onClick={this.onSubmitForm}
                  />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}