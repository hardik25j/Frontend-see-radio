import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './component/common-component/PrivateRoute';
import routes from './utils/routes';
import store from './reducer/store';
import { Provider } from 'react-redux';
import PageNotFound from './component/common-component/PageNotFound';

import './index.css';
import './assets/scss/main.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-table/react-table.css'

const globalStore = store({});

ReactDOM.render(
	<Provider store={globalStore}>
		<Router>
			<>
				<ToastContainer />
				<Switch>
					<Route exact path="/" render={() => <Redirect to="/dashboard" />} />
					{
						routes.map((item, i) => {
							if (item.route === "private")
								return <PrivateRoute key={i} path={item.path} component={item.component} />
							return <Route key={i} path={item.path} component={item.component} />
						})
					}
					<Route exact path="*" component={PageNotFound} />
				</Switch>
			</>
		</Router>
	</Provider>
	, document.getElementById('root')
);

serviceWorker.unregister();
