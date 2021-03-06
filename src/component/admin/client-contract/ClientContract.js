import React, { Component } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { toast } from 'react-toastify';
import { connect } from "react-redux";

import Contact from "./Contact";
import Address from "./Address";
import Company from "./Company";
import Loader from "../../common-component/Loader";
import InputBox from "../../common-component/InpuxBox";
import { checkValidation, getRegExp } from "../../common-component/Validation";
import { postApi } from "../../../utils/interceptors";
import * as action from "../../../action/action";

class ClientContract extends Component {
	constructor(props) {
		super(props);
		this.state = {
			businessAddress: '',
			addressType: '',
			form: {
				companyName: '',
				companyWebsite: '',
				salesPerson: {},
				industry: {},
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
				country: null,
				stateProvince: null,
				postal: '',
				address1Secondary: '',
				address2Secondary: '',
				citySecondary: '',
				countrySecondary: null,
				stateProvinceSecondary: null,
				postalSecondary: ''
			},
			errors: {}
		};
		this.industryList = [];
		this.salesPersonList = [];
	}

	handleChange = (e) => {
		const { form, businessAddress } = this.state;
		const { name, value } = e.target;
		form[name] = value;
		// const { address1Secondary, address1 } = form;

		if (businessAddress) {
			// address1Secondary = address1;
			form.address1Secondary = form.address1;
			form.address2Secondary = form.address2;
			form.citySecondary = form.city;
			form.countrySecondary = form.country;
			form.stateProvinceSecondary = form.stateProvince;
			form.postalSecondary = form.postal;
		}
		this.setState({ form });
	};

	changeDropDown = (e) => {
		const { errors } = this.state;
		const { name, value } = e.target;
		let errorMsg = "";
		if (!value)
			errorMsg = `Please Select.`;
		errors[name] = errorMsg;
		this.setState({ errors }, () => this.handleChange(e));
	}

	checkHandler = (e) => {
		const { checked } = e.target;
		let { form, addressType } = this.state;
		if (checked) {
			addressType = 'business';
			form.address1Secondary = form.address1;
			form.address2Secondary = form.address2;
			form.citySecondary = form.city;
			form.countrySecondary = form.country;
			form.stateProvinceSecondary = form.stateProvince;
			form.postalSecondary = form.postal;
		}
		else {
			addressType = 'billing';
			form.address1Secondary = '';
			form.address2Secondary = '';
			form.citySecondary = '';
			form.countrySecondary = null;
			form.stateProvinceSecondary = null;
			form.postalSecondary = '';
		}
		this.setState({ form, addressType, businessAddress: checked });
	}

	onFieldValidate = (e) => {
		const { name, value, title, attributes } = e.target;
		const { errors } = this.state;
		const isReq = attributes.getNamedItem("data-attribute").value;
		let errorMsg = "";

		if (!value && isReq === 'true')
			errorMsg = `Please Enter ${(title)}.`;
		else if (name === "password" && value.length < 6)
			errorMsg = `Password must be at least 6 characters long.`;
		else if (value && getRegExp(name) && !getRegExp(name).test(value))
			errorMsg = `Please Enter valid ${(title)}.`

		errors[name] = errorMsg;
		this.setState({ errors });
	};

	cleanForm = () => {
		const { form } = this.state;
		Object.keys(form).map((key) => form[key] = '')
		this.setState({ errors: {}, form });
	};

	onSubmitForm = () => {
		const { dispatch } = this.props;
		const { form, errors } = this.state;
		const notReq = ['firstNameSecondary', 'lastNameSecondary', 'emailSecondary',
			'phoneSecondary', 'address2', 'address2Secondary'];
		const validationError = checkValidation(errors, form, notReq);

		if (Object.keys(validationError).length !== 0)
			this.setState({ errors: validationError });
		else {
			this.props.dispatch({ type: action.API_LOADER_ACTIVE })
			const objData = this.setterData();
			postApi('api/company/client', objData)
				.then(() => toast.success("form submitted"))
				.then(() => {
					dispatch(action.stepForm(form.firstName))
					dispatch({ type: action.STEP })
				})
				.catch(response => toast.error(response.errorMessage))
		}
	};

	setterData = () => {
		const { form, businessAddress, addressType } = this.state;
		const { companyName, companyWebsite, salesPerson, firstName, lastName, email, phone,
			firstNameSecondary, lastNameSecondary, emailSecondary, phoneSecondary, address1, address2,
			city, country, stateProvince, postal, address1Secondary, address2Secondary, citySecondary,
			countrySecondary, stateProvinceSecondary, postalSecondary
		} = form;
		const obj = {
			companyName: companyName,
			companyWebsite: companyWebsite,
			personID: "9754b9d4-1832-44e0-b186-08a431033c45",
			sosID: salesPerson.value,
			companyType: 'Client',
			firstName: firstName,
			lastName: lastName,
			email: email,
			phone: phone,
			secondaryContact: {
				firstName: firstNameSecondary,
				lastName: lastNameSecondary,
				email: emailSecondary,
				phone: phoneSecondary,
			},
			contactAddress: {
				business: {
					address: address1,
					address2: address2,
					city: city,
					postal: postal,
					country: country.value,
					state: stateProvince.value,
					provinceID: stateProvince.id
				},
				billing: {
					address: address1Secondary,
					address2: address2Secondary,
					city: citySecondary,
					postal: postalSecondary,
					country: countrySecondary.value,
					state: stateProvinceSecondary.value,
					provinceID: stateProvinceSecondary.id
				}
			},
			addressType: addressType,
			useSame: businessAddress,
			roleCode: 'CLIENT',
			createdByPerson: localStorage.userId,
		}
		return obj;
	}

	render() {
		const { apiLoader } = this.props.loader;
		const { form, errors, businessAddress } = this.state;
		const { companyName, companyWebsite, firstName, lastName, email, phone,
			firstNameSecondary, lastNameSecondary, emailSecondary, phoneSecondary, address1, address2,
			city, country, stateProvince, postal, address1Secondary, address2Secondary, citySecondary,
			countrySecondary, stateProvinceSecondary, postalSecondary } = form;
		return (
			apiLoader
				? <Loader />
				: <Row className="d-flex justify-content-center">
					<Col lg="11" className="mt-5 px-4">
						<div className="title-header">Add New Advertiser</div>
						<Card className="py-5 px-3">
							<CardBody>
								<Company
									isReq={true}
									companyName={companyName}
									companyWebsite={companyWebsite}
									errors={errors}
									industryList={this.industryList}
									handleChange={this.handleChange}
									changeDropDown={this.changeDropDown}
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
									changeDropDown={this.changeDropDown}
									handleChange={this.handleChange}
									onFieldValidate={this.onFieldValidate}
								/>
								<div className="form-title">Billing Address
									<input type="checkbox" className="checkbox" name="businessAddress" onChange={this.checkHandler} />
									Same as Business Address
								</div>
								<Address
									secondary={true}
									isDisabled={businessAddress ? true : false}
									address1={address1Secondary}
									address2={address2Secondary}
									city={citySecondary}
									country={countrySecondary}
									stateProvince={stateProvinceSecondary}
									postal={postalSecondary}
									errors={errors}
									changeDropDown={this.changeDropDown}
									handleChange={this.handleChange}
									onFieldValidate={this.onFieldValidate}
								/>
								<Row className="sumbmit-buttons">
									<InputBox
										type="button"
										name="cancel"
										className="btn btn-outline-secondary button"
										value="Cancel"
										onClick={this.cleanForm}
									/>
									<InputBox
										type="button"
										name="next"
										className="btn btn-primary button"
										value="Next"
										onClick={this.onSubmitForm}
									/>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
		);
	}
}
const select = store => store;
export default connect(select)(ClientContract);