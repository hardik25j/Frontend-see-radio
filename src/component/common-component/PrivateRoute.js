import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils';
import Header from './Header';

export default function PrivateRoute({ component: Component, ...rest }) {
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

PrivateRoute.propTypes = {
	path: PropTypes.string.isRequired,
	component: PropTypes.elementType.isRequired
}