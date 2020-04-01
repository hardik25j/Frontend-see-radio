import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Row } from "reactstrap";
import DatePickerBox from '../../common-component/DatePickerBox'
import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';
import { FilterHeader, FilterFooter } from "../../common-component/FilterComp";
import { getApi, postApi } from "../../../utils/interceptors";
import { toast } from "react-toastify";

export default class FilterCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: this.props.filterData
    }
    this.salesPersonList = [];
    this.advertiserList = [];
    this.actionRequiredPersonList = [];
  }
  componentDidMount() {
    getApi('api/company/persons')
      .then(response => {
        response.data.map((item) => {
          this.salesPersonList.push({ label: item.Person.email, value: item.personID });
          return null;
        })
      })
      .then(
        getApi('api/company/clients')
          .then(response => {
            response.data.map((item) => {
              this.advertiserList.push({ label: item.companyName, value: item.id });
            })
          })
      )
      .then(
        postApi("api/person/all")
          .then(response => {
            response.data.map((item) => {
              this.actionRequiredPersonList.push({ label: item.firstName + " " + item.lastName, value: item.id });
            })
          })
      )
      .catch(response => toast.error(response.errorMessage))
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
  handleSearch = () => {
    this.props.handleSearch(this.state.filter);
  }
  cleanFilter = () => {
    const { filter } = this.state;
    Object.keys(filter).map((key) => {
      filter[key] = '';
    })
    this.setState({ filter }, () => this.handleSearch());
  };
  render() {
    const { handleFilter } = this.props
    const { title, statusID, statusWithPersonID, statusDueDate, startBefore, startAfter, endBefore,
      endAfter, sosID, clientCompanyID } = this.state.filter
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
              name="title"
              placeholder="Search"
              value={title}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Status"
              name="statusID"
              list={this.list}
              value={statusID}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Actions Required By"
              name="statusWithPersonID"
              list={this.actionRequiredPersonList}
              value={statusWithPersonID}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Due On/Before"
              name="statusDueDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={statusDueDate}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Start On/Before"
              name="startBefore"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={startBefore}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Start On/After"
              name="startAfter"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={startAfter}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Finish On/Before"
              name="endBefore"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={endBefore}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Finish On/After"
              name="endAfter"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
              value={endAfter}
              onChange={this.changeDate}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Salesperson"
              name="sosID"
              list={this.salesPersonList}
              value={sosID}
              onChange={this.handleChange}
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Advertiser"
              name="clientCompanyID"
              list={this.advertiserList}
              value={clientCompanyID}
              onChange={this.handleChange}
            />
          </Row>
        </div>
        <FilterFooter
          handleFilter={handleFilter}
          cleanFilter={this.cleanFilter}
          handleSearch={this.handleSearch}
        />
      </div >
    );
  }
}

FilterCampaign.propTypes = {
  filterData: PropTypes.object,
  handleFilter: PropTypes.func,
  handleSearch: PropTypes.func
}