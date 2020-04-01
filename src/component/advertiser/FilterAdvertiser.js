import React, { Component } from "react";
import { Row } from "reactstrap";
import DatePickerBox from '../common-component/DatePickerBox'
import InputBox from "../common-component/InpuxBox";
import DropDownBox from '../common-component/DropDownBox';
import { FilterHeader, FilterFooter } from "../common-component/FilterComp";

export default class FilterAdvertiser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        keyWordID: '',
        lastCampAdd: '',
        salesPerson: {}
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
    const { filter } = this.state;
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
    const { keyWordID, lastCampAdd, salesPerson } = this.state.filter
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
            <DatePickerBox
              label="Last Campaign Added On/ After"
              name="lastCampAdd"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={lastCampAdd}
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
        </div>
        <FilterFooter
          handleFilter={handleFilter}
          cleanFilter={this.cleanFilter}
        />
      </div >
    );
  }
}