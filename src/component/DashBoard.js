import React, { Component } from 'react';

import { Switch } from 'react-router-dom';
import dashboardRoutes from '../utils/routes.js'
import PrivateRoute from '../common-component/PrivateRoute';

const switchRoutes = (
	<Switch>
		{dashboardRoutes.map((prop, key) => {
			return (
				<PrivateRoute
					path={prop.path}
					component={prop.component}
					key={key}
				/>
			);
		}
		)}
	</Switch>
);

class DashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
		}
	}

	render() {
		return (
			<>
				
			</>
		);
	}
}

export default DashBoard;
