import React, { Component } from 'react';
import ReactTable from 'react-table'
import { postApi } from '../utils/interceptors.js';
import { toast } from 'react-toastify';

export default class DashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	componentDidMount() {
		let sendData = {
			limit: 10,
			salesOrgCompanyID: localStorage.companyId
		}
		postApi("api/campaign/getAllCampaigns", sendData)
			.then(response => {
				this.setState({
					data: response.data.rows
				})
			})
			.catch((response) => {
				response && toast.error(response.errorMessage);
			});
	}
	render() {
		const columns = [{
			Header: 'Campaign',
			accessor: 'title',
		}, {
			Header: 'Advertiser',
			accessor: 'title',
		}, {
			Header: 'Status',
			accessor: 'title',
		}, {
			Header: 'Next Action Due By',
			accessor: 'title',
		}]
		return (
			<div className="dashboard-container">
				<div className="dashboard-title">Campaign Views and Watchtime</div>
				<div className="campaign-views">
					<div className="views-item">
						<div className="number">87500</div>
						<div className="details">Total Views for Active Campaigns/Orders</div>
					</div>
					<div className="views-item">
						<div className="number">0</div>
						<div className="details">Total Views of Completed Campaigns</div>
					</div>
					<div className="views-item">
						<div className="number">0 hours</div>
						<div className="details">Total Watchtime of Completed Campaigns</div>
					</div>
				</div>
				<div className="to-do-list">
					<div className="title">	To Do List</div>
					<div className="table">
						<ReactTable
							data={this.state.data}
							columns={columns}
							defaultPageSize={10}
							pageSizeOptions={[10, 20, 50]}
						/>
					</div>
				</div>
				<div className="campaign-details">
					<div className="status">
						<div className="title">Campaigns by Status</div>
					</div>
					<div className="report">
						<div className="title">Campaign Reports</div>
					</div>
				</div>

			</div>
		);
	}
}