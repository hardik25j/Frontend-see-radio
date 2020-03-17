import React, { Component } from "react";
import { Row, Col, Card, CardBody, CardTitle, FormGroup } from "reactstrap";
import { InputBox, DropDownBox } from "../common-component/InpuxBox";
import { getApi } from '../utils/interceptors';
import { toast } from 'react-toastify';

class ClientContract extends Component {
	constructor(props) {
		super(props);
		this.state = {
			form: {
				companyName: '',
				companyWebsite: '',
				salesPerson: '',
				industry: ''
			},
			errors: {}
		};
		this.industryList = [];
		this.salesPersonList = [];
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
		form[name] = value;
		this.setState({form});
	};

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
		const { companyName, companyWebsite, salesPerson, industry } = form;
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
							</CardBody>
						</Card>
					</Col>
				</Row>
			</>
		);
	}
}

export default ClientContract;