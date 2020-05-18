import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Campaign from "./Campaign";
import Distribution from "./Distribution";
import Loader from "../../common-component/Loader";
import InputBox from "../../common-component/InpuxBox";
import {
  checkValidation, setterErrorMsg, getDateDiff, daysDuration, weeksDuration, monthsDuration
} from "../../common-component/Validation";
import { postApi } from "../../../utils/interceptors";
import * as action from "../../../action/action";

class AddCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        salesPerson: {},
        advertiser: {},
        title: '',
        URL: '',
        price: '',
        description: '',
        targetMarket: {},
        views: '',
        startDate: null,
        endDate: null,
        timeSpan: { value: 'days', label: 'Days' },
        duration: 0,
      },
      errors: {}
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: action.API_LOADER_INACTIVE })
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
    this.setState({
      form: { ...form, [name]: date }
    }, () => getDateDiff());
  }

  changeDuration = (e) => {
    const { form } = this.state;
    let { startDate, endDate, timeSpan } = form;
    const { value } = e.target;

    if (timeSpan) {
      if (!startDate)
        startDate = new Date()
      switch (timeSpan.value) {
        case 'days':
          endDate = daysDuration(startDate, value);
          break;
        case 'weeks':
          endDate = weeksDuration(startDate, value);
          break
        case 'months':
          endDate = monthsDuration(startDate, value);
          break;
        default:
          break;
      }
    }
    this.setState({ form: { ...form, duration: value, startDate, endDate } })
  }

  getDateDiff = () => {
    const { form } = this.state;
    var { timeSpan, duration } = form;
    const { startDate, endDate } = form;

    if (startDate && endDate) {
      duration = getDateDiff(startDate, endDate)
    }
    this.setState({ form: { ...form, timeSpan, duration } })
  }

  onFieldValidate = (e) => {
    const { errors } = this.state;
    const { name } = e.target;
    errors[name] = setterErrorMsg(e);
    this.setState({ errors });
  };

  cleanForm = () => {
    const { form } = this.state;
    Object.keys(form).map((key) => form[key] = '')
    this.setState({ errors: {}, form });
  };

  onSubmitForm = () => {
    const { dispatch } = this.props;
    const { form, errors } = this.state;
    const notReq = ['timeSpan', 'duration'];
    const validationError = checkValidation(errors, form, notReq);

    if (Object.keys(validationError).length !== 0) {
      this.setState({ errors: validationError });
    }
    else {
      dispatch({ type: action.API_LOADER_ACTIVE })
      const objData = this.setterData();

      postApi('api/campaign', objData)
        .then(() => toast.success("form submitted"))
        .then(this.props.form.name ? dispatch({ type: action.STEP }) : this.redirectPage())
        .catch(response => toast.error(response.errorMessage))
    }
  };

  redirectPage = () => {
    this.props.history.push('/dashboard');
  }

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
    const { apiLoader } = this.props.loader;
    const { name } = this.props.form;
    const { form, errors } = this.state;
    return (
      apiLoader ? <Loader /> :
        <Row className="d-flex justify-content-center">
          <Col lg="11" className="mt-5 px-4">
            <div className="title-header">{`Add New Campaign ${name ? name : ''}`}</div>
            <Card >
              <CardBody>
                <div className="form-title">Campaign</div>
                <Campaign
                  isReq={true}
                  data={form}
                  errors={errors}
                  handleChange={this.handleChange}
                  changeDropDown={this.changeDropDown}
                  onFieldValidate={this.onFieldValidate}
                />
                <div className="form-title">Distribution</div>
                <Distribution
                  isReq={true}
                  data={form}
                  errors={errors}
                  handleChange={this.handleChange}
                  changeDropDown={this.changeDropDown}
                  changeDate={this.changeDate}
                  changeDuration={this.changeDuration}
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
    );
  }
}

const select = store => store;
export default connect(select)(withRouter(AddCampaign));