import React, { Component } from 'react';
import ReactTable from 'react-table'
import { Switch } from 'react-router-dom';
import dashboardRoutes from '../utils/routes.js'
import PrivateRoute from '../component/common-component/PrivateRoute';
import { postApi } from '../utils/interceptors.js';
import { toast } from 'react-toastify';

// const switchRoutes = (
// 	<Switch>
// 		{dashboardRoutes.map((prop, key) => {
// 			return (
// 				<PrivateRoute
// 					path={prop.path}
// 					component={prop.component}
// 					key={key}
// 				/>
// 			);
// 		}
// 		)}
// 	</Switch>
// );

class DashBoard extends Component {
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
				console.log(response.data);
			})
			.catch((response) => {
				response && toast.error(response.errorMessage);
			});
	}
	render() {
		const columns = [{
			Header: 'ID',
			accessor: 'title',
		}, {
			Header: 'ID',
			accessor: 'title',
		}, {
			Header: 'ID',
			accessor: 'title',
		}, {
			Header: 'ID',
			accessor: 'title',
		}, {
			Header: 'ID',
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
						<div className="number">87500</div>
						<div className="details">Total Views for Active Campaigns/Orders</div>
					</div>
					<div className="views-item">
						<div className="number">87500</div>
						<div className="details">Total Views for Active Campaigns/Orders</div>
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

export default DashBoard;
