import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';


export default class UploadBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceptedFiles: []
    };
  }
  onDrop = (acceptedFiles, rejectedFiles, name) => {
    this.setState({ acceptedFiles }, () => {
      this.props.handleFile(acceptedFiles, rejectedFiles, name)
    })
  };
  render() {
    const { name, placeholder } = this.props;
    const files = this.state.acceptedFiles.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <Dropzone onDrop={(acceptedFiles, rejectedFiles) => { this.onDrop(acceptedFiles, rejectedFiles, name) }}>
        {({ getRootProps, getInputProps }) => (
          <section className="drop-area">
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <p className="placeholder">{placeholder}</p>
            </div>
            <aside>
              <ul>{files}</ul>
            </aside>
          </section>
        )}
      </Dropzone>
    );
  }
}

UploadBox.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  handleFile: PropTypes.func,
}
