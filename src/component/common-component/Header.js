import React, { useState } from "react";

import logo from '../../assets/image/logo.png';
import { logOut, getRoleCode } from '../../utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBell, faUser, faLock, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Navbar from './Navbar';
import { withRouter } from "react-router-dom";

function Header(props) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const { companyName, userName, email } = localStorage;
	const toggle = () => setDropdownOpen(!dropdownOpen)
	const logOutHandler = () => {
		logOut();
		props.history.replace("/login");
	}

	return (
		<>
			<div className="header">
				<div className="img">
					<img src={logo} alt="seeradio" />
				</div>
				<div className="icon">
					<div className="notification">
						<FontAwesomeIcon icon={faBell} />
					</div>
					<div className="user">
						<div className='testCircle'>
							{userName[0] + userName[userName.indexOf(' ') + 1]}
						</div>
						<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
							<DropdownToggle color="link" style={{ padding: "0px" }}>
								<FontAwesomeIcon icon={faChevronDown} />
							</DropdownToggle>
							<DropdownMenu style={{ zIndex: "2020" }}>
								<DropdownItem>
									<FontAwesomeIcon icon={faUser} style={{ color: "#3a85f5" }} />		Profile
								</DropdownItem>
								<DropdownItem>
									<FontAwesomeIcon icon={faLock} style={{ color: "#3a85f5" }} />		Change Password
								</DropdownItem>
								<DropdownItem onClick={logOutHandler}>
									<FontAwesomeIcon icon={faSignOutAlt} style={{ color: "red" }} />		Sign Out
								</DropdownItem>
							</DropdownMenu>
						</ButtonDropdown>
					</div>
					<div className="details">
						<div>{companyName}</div>
						<div style={{ color: "#3a85f5" }} >{getRoleCode()}</div>
						<div>{email}</div>
					</div>
				</div>
			</div>
			<Navbar />
		</>
	);
}

export default withRouter(Header);