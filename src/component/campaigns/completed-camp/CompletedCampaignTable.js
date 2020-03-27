import React, { Component } from "react";
import ReactTable from 'react-table'
import FilterCompletedCamp from "./FilterCompletedCamp";

export default class CompltedCampaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterBar: false
    }
  }

  componentDidMount() {
    // let sendData = {
    //   orderby: "startDate",
    //   salesOrgCompanyID: localStorage.companyId
    // }
    // postApi("api/campaign/getAllCampaigns", sendData)
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch((response) => {
    //     response && toast.error(response.errorMessage);
    //   });
  }

  handleFilter = () => {
    this.setState({ filterBar: !this.state.filterBar });
  }

  render() {
    const { data, filterBar } = this.state;
    const columns = [{
      Header: 'ID',
      accessor: '',// 'clientCompany.readableID'
    }, {
      Header: 'Campaign Title',
      accessor: '',// 'clientCompany.companyName',
      Cell: row => <div>
        <span >
          {row.original.title}<br />{row.original.description}
        </span>
      </div>
    }, {
      Header: 'Advertiser',
      accessor: '',// 'clientCompany'
    }, {
      Header: 'Salesperson',
      accessor: '',// 'clientCompany.campaignLastAddedOn'
    }, {
      Header: 'Watch Time',
      accessor: '',// 'startDate'
    }, {
      Header: 'Views',
      accessor: '',// 'endDate'
    }]

    return (
      <>
        {filterBar &&
          <FilterCompletedCamp
            handleFilter={this.handleFilter}
          />
        }
        <div className="campaign-container">
          <div className="filter-title">
            <button className="filter-button" onClick={this.handleFilter}>Search Filters</button>
            <div className="title">Completed Campaigns</div>
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