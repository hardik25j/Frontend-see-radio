import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login from './component/Login';
import PrivateRoute from './component/common-component/PrivateRoute';
import App from './App';

import './index.css';
import './assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'
import routes from './utils/routes';

ReactDOM.render(
	<Router>
		<div>
			<ToastContainer />
			<Switch>
				<PrivateRoute exact path='/' component={App} />
				<Route path='/login' component={Login} />
				{routes.map((item) => <PrivateRoute path={item.path} component={item.component} />)}
			</Switch>
		</div>
	</Router>
	, document.getElementById('root')
);

serviceWorker.unregister();
