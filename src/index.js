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
import ClientContract from './component/ClientContract';

ReactDOM.render(
	<Router>
		<div>
			<ToastContainer />
			<Switch>
				<PrivateRoute exact path='/' component={App} />
				<Route path='/login' component={Login} />
				<PrivateRoute path='/dashboard' component={DashBoard} />
				<PrivateRoute path='/client-contract' component={ClientContract} />
			</Switch>
		</div>
	</Router>
	, document.getElementById('root')
);

serviceWorker.unregister();
