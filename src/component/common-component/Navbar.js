import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList, faTachometerAlt, faFire, faAd, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link } from "react-router-dom";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adminDropDownOpen: false,
			campaignsDropDownOpen: false,
		}
	}
	adminToggle = () => this.setState({ adminDropDownOpen: !this.state.adminDropDownOpen });
	addAdvertiserHandler = () => {
		this.props.history.push("/client-contract");
	}
	addCampaignHandler = () => {
		this.props.history.push("/add-campaign");
	}

	campaignToggle = () => this.setState({ campaignsDropDownOpen: !this.state.campaignsDropDownOpen });
	activeCampains = () => {
		this.props.history.push("/campaign-table");
	}
	campainMarket = () => {
		this.props.history.push("/campaigns-in-market");
	}
	completedCampaign = () => {
		this.props.history.push("/completed-campaign");
	}
	render() {
		const { adminDropDownOpen, campaignsDropDownOpen } = this.state;
		return (
			<>
				<nav className="navbar navbar-expand-lg bg-see-radio px-lg-4 py-lg-0 sticky-top">
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav nav col-lg-10">
							<li className="nav-link nav-item">
								<Link style={{ color: "white" }} to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} className="mr-1" /> Dashboard</Link>
							</li>
							<li >
								<ButtonDropdown isOpen={campaignsDropDownOpen} toggle={this.campaignToggle}>
									<DropdownToggle color="link" className="nav-link nav-item ml-auto">
										<div className="nav-item" aria-haspopup="true" data-toggle="dropdown">
											<FontAwesomeIcon icon={faFire} className="mr-1" />Campaign
								</div>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem className="menu-item" onClick={this.activeCampains}>Active Campaigns/Orders</DropdownItem>
										<DropdownItem className="menu-item" onClick={this.campainMarket}>Campaigns in Market</DropdownItem>
										<DropdownItem className="menu-item" onClick={this.completedCampaign}>Completed Campaigns</DropdownItem>
									</DropdownMenu>
								</ButtonDropdown>
							</li>
							<li className="nav-link nav-item">
								<Link style={{ color: "white" }} to="/client-report"><FontAwesomeIcon icon={faAd} className="mr-1" /> Advertiser</Link>
							</li>
						</ul>
						<ul className="navbar-nav nav ml-auto">
							<li >
								<ButtonDropdown isOpen={adminDropDownOpen} toggle={this.adminToggle}>
									<DropdownToggle color="link" className="nav-link nav-item ml-auto">
										<div className="nav-item" aria-haspopup="true" data-toggle="dropdown">
											<FontAwesomeIcon icon={faUserTie} className="mr-1" />Administration
										</div>
									</DropdownToggle>
									<DropdownMenu>
										<DropdownItem className="menu-item" onClick={this.addAdvertiserHandler}>
											<FontAwesomeIcon icon={faPlus} className="icon" />Advertiser
										</DropdownItem>
										<DropdownItem className="menu-item" onClick={this.addCampaignHandler}>
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
}

export default withRouter(Navbar);
