import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

function UploadBox(props) {
  const { name, placeholder } = props;
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const onDrop = (accepted, rejected, name) => {
    setAcceptedFiles(accepted)
    props.handleFile(accepted, rejected, name)
  };
  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));
  return (
    <Dropzone onDrop={(acceptedFiles, rejectedFiles) => { onDrop(acceptedFiles, rejectedFiles, name) }}>
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
export default UploadBox;
UploadBox.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.node,
  handleFile: PropTypes.func,
}
