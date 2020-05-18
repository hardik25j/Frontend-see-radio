import React, { Component } from "react";
import ReactTable from 'react-table'
import { toast } from "react-toastify";

import { postApi} from "../../utils/interceptors";
import FilterAdvertiser from "./FilterAdvertiser";

export default class AdvertiserTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filterBar: false
    }
  }

  componentDidMount() {
    let sendData = {
      salesOrgCompanyID: localStorage.companyId
    }
    postApi("api/company/getClientReports", sendData)
      .then(response => {
        this.setState({
          data: response.data
        })
      })
      .catch((response) => {
        response && toast.error(response.errorMessage);
      });
  }

  handleFilter = () => {
    this.setState({ filterBar: !this.state.filterBar });
  }

  render() {
    const { data, filterBar } = this.state;
    const columns = [{
      Header: 'ID',
      accessor: 'clientCompany.readableID'
    }, {
      Header: 'Name',
      accessor: 'clientCompany.companyName'
    }, {
      Header: 'Salesperson',
      accessor: 'clientCompany',
      Cell: row => <div>
        <span >
          {row.row.clientCompany.SOS.firstName} {row.row.clientCompany.SOS.lastName}<br />
        </span>
      </div>
    }, {
      Header: 'Last Campaign Added',
      accessor: 'clientCompany.campaignLastAddedOn'
    }, {
      Header: 'Active Campaigns/Orders',
      accessor: 'clientCompany.activeCampaignsCount'
    }, {
      Header: 'Campaign to Date ',
      accessor: 'clientCompany.campaignsToDate'
    }]

    return (
      <>
        {filterBar &&
          <FilterAdvertiser
            handleFilter={this.handleFilter}
          />
        }
        <div className="campaign-container">
          <div className="filter-title">
            <button className="filter-button" onClick={this.handleFilter}>Search Filters</button>
            <div className="title">Advertisers</div>
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