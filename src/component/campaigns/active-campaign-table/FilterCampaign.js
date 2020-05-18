import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Row } from "reactstrap";
import { toast } from "react-toastify";
import Axios from "axios";

import DatePickerBox from '../../common-component/DatePickerBox'
import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';
import { FilterHeader, FilterFooter } from "../../common-component/FilterComp";
import { getApi, postApi } from "../../../utils/interceptors";
import { filterStatus } from "../../../staticData";

function FilterCampaign(props) {
  const [filter, setFilter] = useState(props.filterData);
  const [salesPersonList, setSalesPersonList] = useState([]);
  const [advertiserList, setAdvertiserList] = useState([]);
  const [actionRequiredPersonList, setActionRequiredPersonList] = useState([]);
  const statusList = filterStatus;
  const { handleFilter } = props
  
  const { title, statusID, statusWithPersonID, statusDueDate, startBefore, startAfter,
    endBefore, endAfter, sosID, clientCompanyID } = filter

  useEffect(() => {
    Axios.all([
      getApi('api/company/persons'),
      getApi('api/company/clients'),
      postApi('api/person/all')
    ])
      .then(Axios.spread((personsResponse, clientsResponse, allResponse) => {
        let list1 = [];
        let list2 = [];
        let list3 = [];
        personsResponse.data.map((item) => {
          list1 = [...list1, { label: item.Person.email, value: item.personID }];
          return null;
        })
        clientsResponse.data.map((item) => {
          list2 = [...list2, { label: item.companyName, value: item.id }];
          return null;
        })
        allResponse.data.map((item) => {
          list3 = [...list3, { label: item.firstName + " " + item.lastName, value: item.id }];
          return null;
        })
        setSalesPersonList(list1);
        setAdvertiserList(list2);
        setActionRequiredPersonList(list3);
      }))
      .catch(response => toast.error(response.errorMessage))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };
  const changeDate = (date, name) => {
    setFilter({ ...filter, [name]: date });
  }
  const handleSearch = () => {
    props.handleSearch(filter);
  }
  const cleanFilter = () => {
    let filterObj = filter;
    Object.keys(filterObj).map((key) => {
      filterObj[key] = '';
    })
    setFilter(filterObj);
    handleSearch();
  };

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
            onChange={handleChange}
          />
        </Row>
        <Row>
          <DropDownBox
            className="w"
            label="Status"
            name="statusID"
            value={statusID}
            list={statusList}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <DropDownBox
            className="w"
            label="Actions Required By"
            name="statusWithPersonID"
            value={statusWithPersonID}
            list={actionRequiredPersonList}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <DatePickerBox
            label="Due On/Before"
            name="statusDueDate"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            value={statusDueDate}
            onChange={changeDate}
          />
        </Row>
        <Row>
          <DatePickerBox
            label="Start On/Before"
            name="startBefore"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            value={startBefore}
            onChange={changeDate}
          />
        </Row>
        <Row>
          <DatePickerBox
            label="Start On/After"
            name="startAfter"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            value={startAfter}
            onChange={changeDate}
          />
        </Row>
        <Row>
          <DatePickerBox
            label="Finish On/Before"
            name="endBefore"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            value={endBefore}
            onChange={changeDate}
          />
        </Row>
        <Row>
          <DatePickerBox
            label="Finish On/After"
            name="endAfter"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            value={endAfter}
            onChange={changeDate}
          />
        </Row>
        <Row>
          <DropDownBox
            className="w"
            label="Salesperson"
            name="sosID"
            value={sosID}
            list={salesPersonList}
            onChange={handleChange}
          />
        </Row>
        <Row>
          <DropDownBox
            className="w"
            label="Advertiser"
            name="clientCompanyID"
            value={clientCompanyID}
            list={advertiserList}
            onChange={handleChange}
          />
        </Row>
      </div>
      <FilterFooter
        // handleFilter={handleFilter}
        cleanFilter={cleanFilter}
        handleSearch={handleSearch}
      />
    </div >
  );
}

export default FilterCampaign;

FilterCampaign.propTypes = {
  filterData: PropTypes.object,
  handleFilter: PropTypes.func,
  handleSearch: PropTypes.func
}