import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './component/Login';
import DashBoard from './component/DashBoard';
import PrivateRoute from './common-component/PrivateRoute';
import App from './App';

import './index.css';
import './assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import ClientContract from './component/client-contract/ClientContract';
import AddCampaign from './component/add-campaign/AddCampaign';
import UploadFiles from './component/upload-files/UploadFiles';

ReactDOM.render(
	<Router>
		<div>
			<ToastContainer />
			<Switch>
				<PrivateRoute exact path='/' component={App} />
				<Route path='/login' component={Login} />
				<PrivateRoute path='/dashboard' component={DashBoard} />
				<PrivateRoute path='/client-contract' component={ClientContract} />
				<PrivateRoute path='/add-campaign' component={AddCampaign} />
				<PrivateRoute path='/upload-files' component={UploadFiles} />
			</Switch>
		</div>
	</Router>
	, document.getElementById('root')
);

serviceWorker.unregister();
