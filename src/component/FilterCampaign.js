import React, { Component } from "react";
import { Row } from "reactstrap";
import DatePickerBox from './common-component/DatePickerBox'
import { InputBox, DropDownBox } from "./common-component/InpuxBox";
import { FilterHeader, FilterFooter } from "./common-component/FilterComp";

export default class FilterCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        keyWordID: '',
        status: '',
        actionReqBy: '',
        dueOnBefore: '',
        startOnBefore: '',
        startOnAfter: '',
        finishOnBefore: '',
        finishOnAfter: '',
        salesPerson: '',
        advertiser: ''
      }
    }
    this.list = [{ label: "Hardik", value: "hardik" }]
  }

  handleChange = (e) => {
    const { filter } = this.state;
    const { name, value } = e.target;
    this.setState({ filter: { ...filter, [name]: value } });
  };

  changeDate = (date, name) => {
    console.log("huhuhu");
    const { filter } = this.state;
    console.log(date, name);
    this.setState({ filter: { ...filter, [name]: date } });
  }
  cleanFilter = () => {
    const { filter } = this.state;
    Object.keys(filter).map((key) => {
      filter[key] = '';
    })
    this.setState({ filter });
  };
  render() {
    const { handleFilter } = this.props
    const { keyWordID, status, actionReqBy, dueOnBefore, startOnBefore, startOnAfter, finishOnBefore,
      finishOnAfter, salesPerson, advertiser } = this.state.filter
    return (
      <div className="filter-sidebar">
        <FilterHeader
          handleFilter={handleFilter}
        />
        <div className="filter-body">
          <Row>
            <InputBox
              label="Keyword(s) / ID"
              type="text"
              name="keyWordID"
              placeholder="Search"
              value={keyWordID}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Status"
              name="status"
              list={this.list}
              value={status}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Actions Required By"
              name="actionReqBy"
              list={this.list}
              value={actionReqBy}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Due On/Before"
              name="dueOnBefore"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={dueOnBefore}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Start On/Before"
              name="startOnBefore"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={startOnBefore}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Start On/After"
              name="startOnAfter"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={startOnAfter}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Finish On/Before"
              name="finishOnBefore"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={finishOnBefore}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Finish On/After"
              name="finishOnAfter"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={finishOnAfter}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Salesperson"
              name="salesPerson"
              list={this.list}
              value={salesPerson}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Advertiser"
              name="advertiser"
              list={this.list}
              value={advertiser}
              onChange={this.handleChange}
            />
          </Row>
        </div>
        <FilterFooter
          handleFilter={handleFilter}
          cleanFilter={this.cleanFilter}
        />
      </div >
    );
  }
}