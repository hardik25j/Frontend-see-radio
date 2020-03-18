import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  FormGroup,
  Card,
  CardBody
} from 'reactstrap';
import { toast } from 'react-toastify';

import { logIn, isLogin } from '../utils';
import { InputBox } from '../common-component/InpuxBox';
import { postApi } from '../utils/interceptors';
import logo from '../assets/image/logo.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: ''
      },
      errors: {}
    }
  }

  componentDidMount() {
    if (isLogin()) {
      this.props.history.push("/dashboard");
    }
  }

  getRegExp = name => {
    let regx = null;

    switch (name) {
      case "email":
        regx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g;
        break;
      default:
        break;
    }
    return regx;
  };

  handleChange = (e) => {
    const { form } = this.state;
    const { name, value } = e.target;
    this.setState({
      form: {
        ...form, [name]: value
      }
    });
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
    console.log("onField", errors);
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

  onSubmitForm = () => {
    const { form, errors } = this.state;
    const { email, password } = form;
    let clientStorage;
    const data = {
      email,
      password
    };
    const validationError = this.checkValidation(errors, data);
    if (Object.keys(validationError).length !== 0) {
      console.log("onsubmit", errors);
      this.setState({ errors: validationError });
    } else {
      let obj = this.state.form;
      postApi("pub/login", obj)
        .then(response => {
          const { personData, token } = response.data;
          clientStorage = {
            token,
            userName: personData.firstName + " " + personData.lastName,
            userId: personData.id,
            roleCode: personData.roleCode,
            email: personData.email
          }
          logIn(clientStorage);
          this.props.history.push('/dashboard');
          toast.success("successful");
        })
        .catch(response => toast.error(response.errorMessage))

      // axios.post(`http://localhost:3005/pub/login`, obj)
      //   .then(response => {
      //     const { personData, token } = response.data.data;
      //     clientStorage = {
      //       token,
      //       userName:personData.firstName+" "+personData.lastName,
      //       userId: personData.id,
      //       roleCode: personData.roleCode,
      //       email: personData.email 
      //     }
      //     logIn(clientStorage);
      //     this.props.history.push('/dashboard');
      //     toast.success("successful");
      //   })
      //   .catch((err) => {
      //     const { response } = err;
      //     if (response && response.data)
      //       toast.error(response.data.errorMessage);
      //   });
    }
  };

  render() {
    const { form, errors } = this.state;
    const { email, password } = form;

    return (
      <div>
        <Container >
          <Row
            className="d-flex justify-content-center">
            <Col lg="6" className="mt-5 px-4">
              <div className="col m  d-flex justify-content-center">
                <img src={logo} alt="seeradio" />
              </div>
              <Card className="px-3 shadow p-3 mb-5 bg-white rounded">
                <CardBody>
                  <InputBox
                    label="Email"
                    type="email"
                    name="email"
                    isReq={true}
                    placeholder="abc@xyz.com"
                    value={email}
                    error={errors.email}
                    onChange={this.handleChange}
                    onBlur={this.onFieldValidate}
                  />
                  <InputBox
                    label="Password"
                    type="password"
                    name="password"
                    isReq={true}
                    placeholder="password"
                    value={password}
                    error={errors.password}
                    onChange={this.handleChange}
                    onBlur={this.onFieldValidate}
                  />
                  <FormGroup check row>
                    <Col className="d-flex justify-content-center mt-5 ">
                      <input type="button" className="btn btn-primary" value="Submit" onClick={this.onSubmitForm} />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container >
      </div>
    );
  }
};