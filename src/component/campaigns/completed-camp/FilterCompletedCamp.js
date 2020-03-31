import React, { Component } from "react";
import { Row } from "reactstrap";
import { FilterHeader, FilterFooter } from "../../common-component/FilterComp";
import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';

export default class FilterCompletedCamp extends Component {
  constructor() {
    super();
    this.state = {
      filter: {
        keyWordID: '',
        salesPerson: '',
        advertiser: '',
        groupBy: ''
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
    const { keyWordID, salesPerson, advertiser, groupBy } = this.state.filter
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
          <Row>
            <DropDownBox
              className="w"
              label="Group By"
              name="groupBy"
              list={this.list}
              value={groupBy}
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