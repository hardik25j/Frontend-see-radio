import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils';
import Header from './Header';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<>
			{isLogin() && <Header />}
			<Route {...rest} render={props => (
				isLogin()
					? <Component {...props} />
					: <Redirect to="/login" />
			)} />
		</>
	);
};

export default PrivateRoute;