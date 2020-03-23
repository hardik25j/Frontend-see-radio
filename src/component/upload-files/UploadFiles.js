import React, { Component } from "react";
import { CardBody, Card, Col, Row } from "reactstrap";
import { InputBox } from "../../common-component/InpuxBox";
import UploadBox from "../../common-component/UploadBox";
import { postApi } from "../../utils/interceptors";
import { toast } from "react-toastify";

export default class UploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptFile: [],
      voiceFile: [],
      otherFile: []
    }
  }
  onFileChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    this.setState({
      name: e.target.files[0]
    });
  };
  handleFile = (acceptedFiles, rejectedFiles, name) => {
    this.setState({ [name]: acceptedFiles })
  };
  cleanForm = () => {
    let state = this.state;
    Object.keys(state).map((key) => {
      state[key] = '';
    })
    this.setState(state);
  };
  onSubmitForm = () => {
    const formDataObj = new FormData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    for (let name in this.state) {
      formDataObj.append(name, this.state[name]);
    }
    postApi(``, formDataObj, config)
      .then(() => alert("File uploaded successfully."))
      .catch(response => toast.error(response.errorMessage))
  }
  render() {
    return (
      <>
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
      </>
    );
  }
}