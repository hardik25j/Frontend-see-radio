import React, { Component } from "react";
import ReactTable from 'react-table'
import { postApi } from "../../../utils/interceptors";
import { toast } from "react-toastify";
import FilterCampaign from "./FilterCampaign";
import PersonDetail from "./PersonDetail";
import { Link } from "react-router-dom";

export default class CampaignTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterBar: false,
      modal: false,
      personID: '',
    }
    this.filterData = {
      title: '',
      statusID: '',
      statusWithPersonID: '',
      statusDueDate: '',
      startBefore: '',
      startAfter: '',
      endBefore: '',
      endAfter: '',
      sosID: '',
      clientCompanyID: ''
    }
  }

  componentDidMount() {
    this.getCampaignData();
  }
  resetFilter = () => {

  }
  getCampaignData = (filterObj) => {
    const getValue = ['sosID', 'clientCompanyID', 'statusWithPersonID', 'statusID'];
    let payLoad = {
      limit: 10,
      salesOrgCompanyID: localStorage.companyId,
    }
    if (filterObj) {
      this.filterData = filterObj;
      Object.keys(filterObj).map((key) => {
        if (filterObj[key] != '') {
          if (getValue.includes(key))
            payLoad[key] = filterObj[key].value;
          else
            payLoad[key] = filterObj[key]
        }
      })
    }
    postApi("api/campaign/getAllCampaigns", payLoad)
      .then(response => {
        this.setState({
          data: response.data.rows
        })
      })
      .catch((response) => {
        response && toast.error(response.errorMessage);
      });
  }
  handleFilter = () => {
    this.setState({ filterBar: !this.state.filterBar });
  }
  openModal = (id) => {
    this.setState({ personID: id, modal: !this.state.modal })
  }
  toggleModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  render() {
    const { data, filterBar, modal, personID } = this.state;
    const columns = [{
      Header: 'ID',
      accessor: 'clientCampaignNumber'
    }, {
      Header: 'Title/Details',
      accessor: 'title',
      Cell: row => <div>
        <Link to={`/campaign-detail/${row.original.id}`}>{row.original.title}</Link>
        <span >
          <br />{row.original.description}
        </span>
      </div>
    }, {
      Header: 'Advertiser',
      accessor: 'clientCompany.companyName'
    }, {
      Header: 'Action Required By',
      accessor: 'statusWithPerson',
      Cell: row => <div>
        <span >
          <Link to={`/campaign-table`} onClick={() => this.openModal(row.row.statusWithPerson.id)}>
            {row.row.statusWithPerson.firstName} {row.row.statusWithPerson.lastName}
          </Link><br />
          ({row.row.statusWithPerson.roleCode})
        </span>
      </div>
    }, {
      Header: 'Next Action Due By',
      accessor: 'statusDueDate',
      Cell: row => <div>
        <span >
          {row.row.statusDueDate} <br />
          {Date() > row.row.statusDueDate ? '(Overdue)' : null}
        </span>
      </div>
    }, {
      Header: 'Start',
      accessor: 'startDate'
    }, {
      Header: 'Finish',
      accessor: 'endDate'
    }]

    return (
      <>
        <PersonDetail modal={modal} id={personID} toggle={this.toggleModal} />
        {filterBar &&
          <FilterCampaign
            filterData={this.filterData}
            handleFilter={this.handleFilter}
            handleSearch={this.getCampaignData}
          />
        }
        <div className="campaign-container">
          <div className="filter-title">
            <button className="filter-button" onClick={this.handleFilter}>Search Filters</button>
            <div className="title">Active Campaigns/Orders</div>
          </div>
          <ReactTable
            data={data}
            columns={columns}
            defaultPageSize={6}
            pageSizeOptions={[10, 20, 50]}
          />
        </div>
      </>
    );
  }
}