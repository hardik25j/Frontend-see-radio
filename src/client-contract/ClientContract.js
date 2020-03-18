import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import Contact from "./Contact";
import Address from "./Address";
import Company from "./Company";

class ClientContract extends Component {
	constructor(props) {
		super(props);
		this.state = {
			businessAddress: '',
			form: {
				companyName: '',
				companyWebsite: '',
				salesPerson: '',
				industry: '',
				firstName: '',
				lastName: '',
				email: '',
				phone: '',
				firstNameSecondary: '',
				lastNameSecondary: '',
				emailSecondary: '',
				phoneSecondary: '',
				address1: '',
				address2: '',
				city: '',
				country: '',
				stateProvince: '',
				postal: '',
				address1Secondary: '',
				address2Secondary: '',
				citySecondary: '',
				countrySecondary: '',
				stateProvinceSecondary: '',
				postalSecondary: ''
			},
			errors: {}
		};
		this.industryList = [];
		this.salesPersonList = [];
		this.countryList = [
			{ value: "CA", label: "Canada" },
			{ value: "US", label: "United States" },
		];
	}
	handleChange = (e) => {
		const { form, businessAddress } = this.state;
		const { name, value } = e.target;
		form[name] = value;
		if (businessAddress) {
			form.address1Secondary = form.address1;
			form.address2Secondary = form.address2;
			form.citySecondary = form.city;
			form.countrySecondary = form.country;
			form.stateProvinceSecondary = form.stateProvince;
			form.postalSecondary = form.postal;
		}
		else {
			form.address1Secondary = '';
			form.address2Secondary = '';
			form.citySecondary = '';
			form.countrySecondary = '';
			form.stateProvinceSecondary = '';
			form.postalSecondary = '';
		}
		this.setState({ form });
	};
	checkHandler = (e) => {
		const { checked } = e.target;
		const { form, businessAddress } = this.state;
		if (checked) {
			form.address1Secondary = form.address1;
			form.address2Secondary = form.address2;
			form.citySecondary = form.city;
			form.countrySecondary = form.country;
			form.stateProvinceSecondary = form.stateProvince;
			form.postalSecondary = form.postal;
		}
		else {
			form.address1Secondary = '';
			form.address2Secondary = '';
			form.citySecondary = '';
			form.countrySecondary = '';
			form.stateProvinceSecondary = '';
			form.postalSecondary = '';
		}
		this.setState({ form, businessAddress: checked });
	}
	onFieldValidate = (e) => {
		const { name, value } = e.target;
		const { errors } = this.state;
		let errorMsg = "";
		if (!value) {
			errorMsg = `Please Enter ${(name)}.`;
		} else if (name === 'email' && value && !this.getRegExp('email').test(value)) {
			errorMsg = `Please Enter valid ${(name)}.`;
		} else if (name === "password" && value.length < 6) {
			errorMsg = `Password must be at least 6 characters long.`;
		}
		errors[name] = errorMsg;
		this.setState({ errors });
	};
	checkValidation = (errors, data) => {
		const finalErrors = {};
		Object.keys(data).map((key) => {
			if (data[key] === '' || data[key] === {}) {
				finalErrors[key] = `Please enter ${key}.`
			}
		});
		Object.keys(errors).map((key) => {
			if (errors[key] !== "") {
				finalErrors[key] = errors[key]
			}
		});
		return finalErrors;
	};

	render() {
		const { form, errors, businessAddress } = this.state;
		const { companyName, companyWebsite, salesPerson, industry, firstName, lastName, email, phone,
			firstNameSecondary, lastNameSecondary, emailSecondary, phoneSecondary, address1, address2,
			city, country, stateProvince, postal, address1Secondary, address2Secondary, citySecondary,
			countrySecondary, stateProvinceSecondary, postalSecondary } = form;
		return (
			<>
				<Row className="d-flex justify-content-center">
					<Col lg="11" className="mt-5 px-4">
						<div className="title-header">Add New Advertiser</div>
						<Card className="py-5 px-3">
							<CardBody>
								<Company
									isReq={true}
									companyName={companyName}
									companyWebsite={companyWebsite}
									salesPerson={salesPerson}
									industry={industry}
									errors={errors}
									industryList={this.industryList}
									salesPersonList={this.salesPersonList}
									handleChange={this.handleChange}
									onFieldValidate={this.onFieldValidate}
								/>

								<div className="form-title">Primary Contact</div>
								<Contact
									isReq={true}
									firstName={firstName}
									lastName={lastName}
									email={email}
									phone={phone}
									errors={errors}
									handleChange={this.handleChange}
									onFieldValidate={this.onFieldValidate}
								/>

								<div className="form-title">Secondary Contact (Billing - Optional)</div>
								<Contact
									isReq={false}
									secondary={true}
									firstName={firstNameSecondary}
									lastName={lastNameSecondary}
									email={emailSecondary}
									phone={phoneSecondary}
									errors={errors}
									handleChange={this.handleChange}
									onFieldValidate={this.onFieldValidate}
								/>

								<div className="form-title">Business Address</div>
								<Address
									isDisabled={false}
									address1={address1}
									address2={address2}
									city={city}
									country={country}
									stateProvince={stateProvince}
									postal={postal}
									errors={errors}
									countryList={this.countryList}
									handleChange={this.handleChange}
									handleCountry={this.handleCountry}
									onFieldValidate={this.onFieldValidate}
								/>

								<div className="form-title">
									Business Address
								<input type="checkbox" className="checkbox" name="businessAddress" onChange={this.checkHandler} />
								Same as Business Address</div>
								<Address
									secondary={true}
									isDisabled={businessAddress}
									address1={address1Secondary}
									address2={address2Secondary}
									city={citySecondary}
									country={countrySecondary}
									stateProvince={stateProvinceSecondary}
									postal={postalSecondary}
									countryList={this.countryList}
									errors={errors}
									handleCountry={this.handleCountry}
									handleChange={this.handleChange}
									onFieldValidate={this.onFieldValidate}
								/>
								<Row className="d-flex justify-content-end">
									<input type="button" className="btn btn-outline-secondary button" value="Cancel" />
									<input type="button" className="btn btn-primary button" value="Next" />
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
}

export default ClientContract;