import React, { Component } from "react";
import ReactTable from "react-table";
import { postApi } from "../../utils/interceptors";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as action from "../../action/action";
import Loader from "../common-component/Loader";
import { Link } from "react-router-dom";
import { getStatus } from "../../utils";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    let sendData = {
      limit: 10,
      salesOrgCompanyID: localStorage.companyId
    }
    postApi("api/campaign/getAllCampaigns", sendData)
      .then(response => {
        this.setState({ data: response.data.rows }, () => {
          this.props.dispatch({ type: action.API_LOADER_INACTIVE })
        })
      })
      .catch((response) => response && toast.error(response.errorMessage));
  }

  render() {
    const { apiLoader } = this.props.loader;
    const { data } = this.state;
    const columns = [{
      Header: 'Campaign',
      accessor: "title",
      Cell: row => <div style={{ textAlign: "center" }} className="cp-name">
        <Link to="">{row.value}</Link>
      </div>
    }, {
      Header: 'Advertiser',
      accessor: "clientCompany.companyName",
    }, {
      Header: 'Status',
      Cell: row => <div>{getStatus(row.original.statusID)}</div>
    }, {
      Header: 'Next Action Due By',
      accessor: "statusDueDate",
    }]
    return (
      <>
        <div className="to-do-list">
          <div className="title">	To Do List</div>
          <div className="table">
            <ReactTable
              data={data}
              columns={columns}
              loading={apiLoader}
              LoadingComponent={Loader}
              defaultPageSize={5}
              showPaginationBottom={false}
            />
          </div>
        </div>
      </>
    );
  }
}

const select = store => store;
export default connect(select)(ToDoList);