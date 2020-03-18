import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, FormGroup } from "reactstrap";
import { InputBox, DropDownBox } from "../common-component/InpuxBox";
import { getApi } from '../utils/interceptors';
import { toast } from 'react-toastify';
import Contact from "./Contact";
import Address from "./Address";

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
		this.stateProvinceList = [];
		this.countryList = [
			{ value: "CA", label: "Canada" },
			{ value: "US", label: "United States" },
		];
	}

	componentDidMount() {
		getApi('api/company/persons')
			.then(response => {
				response.data.map((item) => {
					const { id, firstName, lastName, email } = item.Person;
					this.salesPersonList.push({ value: id, label: firstName + " " + lastName + "- " + email })
				})
			})
			.then(
				getApi('api/wholesalepricing/getIndustries')
					.then(response => {
						response.data.map((item) => {
							this.industryList.push({ value: item.id, label: item.name })
						})
					})
			)
			.catch(response => toast.error(response.errorMessage))
	}

	handleChange = (e) => {
		const { form } = this.state;
		const { name, value } = e.target;
		const { address1, address1Secondary, address2, address2Secondary,
			city, citySecondary, country, countrySecondary, stateProvince,
			stateProvinceSecondary
		}
		form[name] = value;
		if (businessAddress) {
			form.address1Secondary = form.address1;
			form.address2Secondary = form.address2;
			fo
		}
		this.setState({ form });
	};

	handleCountry = (e) => {
		this.stateProvinceList = [];
		console.log("LIST", e.target.value);
		getApi(`pub/states/${e.target.value}`)
			.then(response => {
				response.data.map((item) => {
					const { name, code } = item;
					this.stateProvinceList = [...this.stateProvinceList, { value: code, label: name }]
				})
				console.log(this.stateProvinceList);
			})
			.catch(response => toast.error(response.errorMessage))
		this.handleChange(e);
	}

	checkHandler = (e) => {
		const { name, checked } = e.target;
		this.setState({ [name]: checked });
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
		const { form, errors } = this.state;
		const {
			companyName, companyWebsite, salesPerson,
			industry, firstName, lastName,
			email, phone, firstNameSecondary,
			lastNameSecondary, emailSecondary,
			phoneSecondary, address1,
			address2, city, country,
			stateProvince, postal } = form;
		return (
			<>
				<Row className="d-flex justify-content-center">
					<Col lg="11" className="mt-5 px-4">
						<div className="title-header">Add New Advertiser</div>
						<Card className="py-5 px-3">
							<CardBody>
								<Row>
									<Col>
										<InputBox
											label="Company Name"
											type="text"
											name="companyName"
											isReq={true}
											placeholder="Company Name"
											value={companyName}
											error={errors.companyName}
											onChange={this.handleChange}
											onBlur={this.onFieldValidate}
										/>
									</Col>
									<Col>
										<InputBox
											label="Company Website Address"
											type="text"
											name="companyWebsite"
											isReq={true}
											placeholder="www.abc.com"
											value={companyWebsite}
											error={errors.companyWebsite}
											onChange={this.handleChange}
											onBlur={this.onFieldValidate}
										/>
									</Col>
								</Row>
								<Row>
									<Col>
										<DropDownBox
											label="Salesperson"
											name="salesPerson"
											isReq={true}
											list={this.salesPersonList}
											placeholder="Company Name"
											value={salesPerson}
											error={errors.salesPerson}
											onChange={this.handleChange}
											onBlur={this.onFieldValidate}
										/>
									</Col>
									<Col>
										<DropDownBox
											label="Industry Category"
											name="industry"
											isReq={true}
											list={this.industryList}
											placeholder="Industry Name"
											value={industry}
											error={errors.industry}
											onChange={this.handleChange}
											onBlur={this.onFieldValidate}
										/>
									</Col>
								</Row>

								<div className="form-title">Primary Contact</div>
								<Contact
									isReq={true}
									firstName={firstName}
									lastName={lastName}
									email={email}
									phone={phone}
									errors={this.state.errors}
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
									address1={address1}
									address2={address2}
									city={city}
									country={country}
									stateProvince={stateProvince}
									postal={postal}
									errors={errors}
									stateProvinceList={this.stateProvinceList}
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
									address1={address1}
									address2={address2}
									city={city}
									country={country}
									stateProvince={stateProvince}
									postal={postal}
									errors={errors}
									stateProvinceList={this.stateProvinceList}
									countryList={this.countryList}
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