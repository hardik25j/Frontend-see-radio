import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './component/common-component/PrivateRoute';
import App from './App';
import routes from './utils/routes';

import './index.css';
import './assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'


ReactDOM.render(
	<Router>
		<div>
			<ToastContainer />
			<Switch>
				<PrivateRoute exact path='/' component={App} />
				{
					routes.map((item, i) => {
						if (item.route === "private")
						return <PrivateRoute key={i} path={item.path} component={item.component} />
						return <Route key={i} path={item.path} component={item.component} />
					})
				}
			</Switch>
		</div>
	</Router>
	, document.getElementById('root')
);

serviceWorker.unregister();
