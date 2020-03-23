import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from "react-router-dom";

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			adminiDropDownOpen: false,
		}
	}
	toggle = () => this.setState({ adminiDropDownOpen: !this.state.adminiDropDownOpen });
	addAdvertiserHandler = () => {
		this.props.history.push("/client-contract");
	}
	addCampaignHandler = () => {
		this.props.history.push("/add-campaign");
	}

	render() {
		const { adminiDropDownOpen } = this.state;
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary px-lg-4 py-lg-0 ">
				<ul className="nav-item nav">
					<li className="nav-link nav-item">
						<div className="nav-comp">
							<div className="nav-comp-left">
								<div>Dashboard</div>
								<div>Campaigns</div>
								<div>Advertisers</div>
							</div>
							<div>
								<ButtonDropdown isOpen={adminiDropDownOpen} toggle={this.toggle}>
									<DropdownToggle color="link" style={{ padding: "0px" }}>
										<div className="nav-item" aria-haspopup="true" data-toggle="dropdown">
											Administration
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
							</div>
						</div>
					</li>
				</ul>
			</nav>
		);
	}
}

export default withRouter(Navbar);

{/* <div
	tabindex="-1"
	role="menu"
	aria-hidden="true"
	class="dropdown-menu shadow border-0 fs-14 dropdown-menu">
	<button type="button" tabindex="0" role="menuitem" class="p-0 dropdown-item">
		<li id="Header-add-advertiser" class="link text-black  nav-item">
			<a class="text-black d-block px-3 py-1" href="/client-contract">
				<i class="fa fa-plus fs-20 dropdown-icon mr-2 text-primary"></i>
													 Advertiser
											</a>
		</li>
	</button>
	<button type="button" tabindex="0" role="menuitem" class="p-0 dropdown-item">
		<li id="Header-add-campaign" class="link text-black  nav-item">
			<a class="text-black d-block px-3 py-1" href="/add-campaign">
				<i class="fa fa-plus fs-20 dropdown-icon mr-2 text-primary"></i>
																 Campaign
											</a>
		</li>
	</button>
	<button type="button" tabindex="0" role="menuitem" class="p-0 dropdown-item">
		<li id="Header-add-sos" class="link text-black  nav-item">
			<a class="text-black d-block px-3 py-1" href="/add-salesperson">
				<i class="fa fa-plus fs-20 dropdown-icon mr-2 text-primary"></i>
																			 Salesperson
											</a>
		</li>
	</button>
	<button type="button" tabindex="0" role="menuitem" class="p-0 dropdown-item">
		<li id="Header-account" class="nav-item">
			<a class="text-black d-flex align-items-center px-3 py-2" href="/account-listing">
				<i class="fa fa-stream fs-18 dropdown-icon mr-2"></i>
												Account Listing
												</a>
		</li>
	</button>
</div> */}