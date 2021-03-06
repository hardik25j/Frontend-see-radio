import React, { Component } from "react";
import { CardBody, Card, Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import InputBox from "../common-component/InpuxBox";
import Loader from "../common-component/Loader";
import UploadBox from "../common-component/UploadBox";
import { postApi } from "../../utils/interceptors";
import * as action from "../../action/action";

class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptFile: [],
      voiceFile: [],
      otherFile: []
    }
  }

  componentDidMount() {
    this.props.dispatch({ type: action.API_LOADER_INACTIVE })
  }

  onFileChange = (e) => {
    e.preventDefault();
    this.setState({ name: e.target.files[0] });
  };

  handleFile = (acceptedFiles, name) => this.setState({ [name]: acceptedFiles });
  cleanForm = () => {
    let state = this.state;
    Object.keys(state).map((key) => state[key] = '');
    this.setState(state);
  };
  
  onSubmitForm = () => {
    const { dispatch } = this.props;
    const formDataObj = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'x-token': localStorage.token
      }
    }
    for (let name in this.state) {
      formDataObj.append('file', this.state[name]);
    }
    formDataObj.append('type', "SCRIPT");
    formDataObj.append('campaignID', 'f6dc571a-40e3-4391-b9f0-30fa652e989d');
    formDataObj.append('uploadedBy', localStorage.userId);

    this.props.dispatch({ type: action.API_LOADER_INACTIVE })
    postApi(`/api/campaign/upload`, formDataObj, config)
      .then(() => toast.success("form submitted"))
      .then(() => {
        dispatch({ type: action.API_LOADER_INACTIVE })
        dispatch(action.stepForm(''))
        dispatch({ type: action.STEP })
      })
      .then(this.redirectPage())
      .catch(response => toast.error(response.errorMessage))
  }

  redirectPage = () => {
    this.props.history.push('/dashboard');
  }

  render() {
    const { apiLoader } = this.props.loader;
    return (
      <>
        {
          apiLoader ? <Loader /> :
            <Row className="d-flex justify-content-center">
              <Col lg="11" className="mt-5 px-4">
                <div className="title-header">Add New Campaign</div>
                <Card >
                  <CardBody>

                    <div className="form-title">Script File</div>
                    <Row>
                      <Col>
                        <UploadBox
                          name="scriptFile"
                          placeholder="Drag & Drop Your SCRIPT File Here, or Click to Select File"
                          handleFile={this.handleFile}
                        />
                      </Col>
                      <div className="option">OR</div>
                      <Col>
                        <InputBox
                          type="file"
                          name="scriptFile"
                          onChange={this.onFileChange}
                        />
                      </Col>
                    </Row>

                    <div className="form-title">Voice File</div>
                    <Row>
                      <Col>
                        <UploadBox
                          name="voiceFile"
                          placeholder="Drag & Drop Your AUDIO File Here, or Click to Select File"
                          handleFile={this.handleFile}
                        />
                      </Col>
                      <div className="option">OR</div>
                      <Col>
                        <InputBox
                          type="file"
                          name="voiceFile"
                          onChange={this.onFileChange}
                        />
                      </Col>
                    </Row>

                    <div className="form-title">Other File</div>
                    <Row>
                      <Col>
                        <UploadBox
                          name="otherFile"
                          placeholder="Drag & Drop Your OTHER File Here, or Click to Select File"
                          handleFile={this.handleFile}
                        />
                      </Col>
                      <div className="option">OR</div>
                      <Col>
                        <InputBox
                          type="file"
                          name="otherFile"
                          onChange={this.onFileChange}
                        />
                      </Col>
                    </Row>

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
                        name="done"
                        className="btn btn-primary button"
                        value="Done"
                        onClick={this.onSubmitForm}
                      />
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        }
      </>
    );
  }
}

const select = store => store;
export default connect(select)(UploadFiles);