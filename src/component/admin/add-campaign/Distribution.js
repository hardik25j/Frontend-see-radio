import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import DatePickerBox from "../../common-component/DatePickerBox";
import { getApi } from "../../../utils/interceptors";
import { toast } from "react-toastify";
import { DropDownBox, InputBox } from "../../common-component/InpuxBox";

export default class Distribution extends Component {
  constructor(props) {
    super(props);
    this.targetMarketList = [];
    this.timeSpanList = [
      { label: 'Days', value: 'days' },
      { label: 'Weeks', value: 'weeks' },
      { label: 'Month', value: 'month' }
    ];
  }
  componentDidMount() {
    getApi(`api/company/salesOrg/${localStorage.companyId}`)
      .then(response => {
        const { id, name } = response.data.salesOrgCompany.Market
        this.targetMarketList.push({ value: id, label: name });
      })
      .catch(response => toast.error(response))
  }
  render() {
    const { isReq, data, errors, handleChange, onFieldValidate, changeDropDown, changeDate } = this.props;
    const { targetMarket, views, startDate, endDate, timeSpan, duration } = data;
    return (
      <>
        <Row>
          <Col>
            <DropDownBox
              label="Target Market"
              name="targetMarket"
              isReq={isReq}
              list={this.targetMarketList}
              value={targetMarket}
              error={errors.targetMarket}
              onChange={changeDropDown}
            />
          </Col>
          <Col>
            <InputBox
              label="Views"
              name="views"
              type="number"
              isReq={isReq}
              placeholder="Minimum value is 2500"
              value={views}
              error={errors.views}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
        <Row>
          <Col lg='5'>
            <DatePickerBox
              label="Start Date"
              name="startDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              isReq={isReq}
              value={startDate}
              error=''
              onChange={changeDate}
            />
          </Col>
        </Row>
        <Row>
          <Col lg='5'>
            <DatePickerBox
              label="Select End Date"
              name="endDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              isReq={isReq}
              value={endDate}
              error=''
              onChange={changeDate}
            />
          </Col>
          <Col>
            <DropDownBox
              label="Select"
              name="timeSpan"
              value={timeSpan}
              list={this.timeSpanList}
              onChange={changeDropDown}
            />
          </Col>
          <Col>
            <InputBox
              label="Duration"
              name="duration"
              type="text"
              placeholder="Enter the duration"
              value={duration}
              onChange={handleChange}
              onBlur={onFieldValidate}
            />
          </Col>
        </Row>
      </>
    );
  }
}