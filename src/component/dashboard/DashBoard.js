import React, { useState, useEffect } from 'react';
import { postApi } from '../../utils/interceptors.js';
import { toast } from 'react-toastify';
import ToDoList from './ToDoList.js';
import { connect } from "react-redux";
import * as action from "../../action/action";
import Loader from "../common-component/Loader";
import PieChart from './ReportChart.js';
import StatusChart from './StatusChart.js';

function DashBoard(props) {
	const { apiLoader } = props.loader;
	const [viewsAndWatch, setViewsAndWatch] = useState({
		totalViewsPurchased: '',
		totalViewsCompleted: 0,
		totalWatchTimeCompleted: 0
	});

	useEffect(() => {
		props.dispatch({ type: action.API_LOADER_ACTIVE })
		postApi("api/campaign/campaignViewsAndWatchtime")
			.then(response => setViewsAndWatch(response.data))
			.catch((response) => response && toast.error(response.errorMessage));
	}, [])

	const { totalViewsPurchased, totalViewsCompleted, totalWatchTimeCompleted } = viewsAndWatch;

	return (
		<div className="dashboard-container">
			<div className="dashboard-title">Campaign Views and Watchtime</div>
			<div className="campaign-views">
				{
					apiLoader ? <Loader /> :
						<>
							<div className="views-item">
								<div className="number">{totalViewsPurchased}</div>
								<div className="details">Total Views for Active Campaigns/Orders</div>
							</div>
							<div className="views-item">
								<div className="number">{totalViewsCompleted}</div>
								<div className="details">Total Views of Completed Campaigns</div>
							</div>
							<div className="views-item">
								<div className="number">{totalWatchTimeCompleted} hours</div>
								<div className="details">Total Watchtime of Completed Campaigns</div>
							</div>
						</>
				}
			</div>
			<ToDoList />
			<div className="campaign-details">
				<div className="status">
					<div className="title">Campaigns by Status</div>
					<StatusChart />
				</div>
				<div className="report">
					<div className="title">Campaign Reports</div>
					<PieChart />
				</div>
			</div>
		</div>
	);
}

const select = store => store;
export default connect(select)(DashBoard);