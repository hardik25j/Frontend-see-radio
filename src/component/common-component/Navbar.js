import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faTachometerAlt, faFire, faAd, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from "react-router-dom";

function Navbar(props) {
	const [adminDropDownOpen, setAdminDropDownOpen] = useState(false);
	const [campaignsDropDownOpen, setCampaignsDropDownOpen] = useState(false);

	const adminToggle = () => setAdminDropDownOpen(!adminDropDownOpen);
	const addAdvertiserHandler = () => props.history.push("/client-contract");
	const addCampaignHandler = () => props.history.push("/add-campaign");

	const campaignToggle = () => setCampaignsDropDownOpen(!campaignsDropDownOpen);
	const activeCampains = () => props.history.push("/campaign-table");
	const campainMarket = () => props.history.push("/campaigns-in-market");
	const completedCampaign = () => props.history.push("/completed-campaign");

	return (
		<>
			<nav className="navbar navbar-expand-lg bg-see-radio px-lg-4 py-lg-0 sticky-top">
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav nav col-lg-10">
						<Link style={{ color: "white" }} to="/dashboard">
							<li className="nav-link nav-item">
								<FontAwesomeIcon icon={faTachometerAlt} className="mr-1" /> Dashboard
								</li>
						</Link>
						<li >
							<ButtonDropdown isOpen={campaignsDropDownOpen} toggle={campaignToggle}>
								<DropdownToggle color="link" className="nav-link nav-item ml-auto">
									<div className="nav-item" aria-haspopup="true" data-toggle="dropdown">
										<FontAwesomeIcon icon={faFire} className="mr-1" />Campaign
								</div>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem className="menu-item" onClick={activeCampains}>Active Campaigns/Orders</DropdownItem>
									<DropdownItem className="menu-item" onClick={campainMarket}>Campaigns in Market</DropdownItem>
									<DropdownItem className="menu-item" onClick={completedCampaign}>Completed Campaigns</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</li>
						<Link style={{ color: "white" }} to="/client-report">
							<li className="nav-link nav-item">
								<FontAwesomeIcon icon={faAd} className="mr-1" /> Advertiser
								</li>
						</Link>
					</ul>
					<ul className="navbar-nav nav ml-auto">
						<li >
							<ButtonDropdown isOpen={adminDropDownOpen} toggle={adminToggle}>
								<DropdownToggle color="link" className="nav-link nav-item ml-auto">
									<div className="nav-item" aria-haspopup="true" data-toggle="dropdown">
										<FontAwesomeIcon icon={faUserTie} className="mr-1" />Administration
										</div>
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem className="menu-item" onClick={addAdvertiserHandler}>
										<FontAwesomeIcon icon={faPlus} className="icon" />Advertiser
										</DropdownItem>
									<DropdownItem className="menu-item" onClick={addCampaignHandler}>
										<FontAwesomeIcon icon={faPlus} className="icon" />Campaign
										</DropdownItem>
									<DropdownItem className="menu-item">
										<FontAwesomeIcon icon={faPlus} className="icon" />Salesperson
										</DropdownItem>
									<DropdownItem className="menu-item">
										<FontAwesomeIcon icon={faList} className="icon" />Account Listing
										</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);

}

export default withRouter(Navbar);
