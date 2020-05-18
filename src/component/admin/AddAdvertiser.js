import React from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import ClientContract from './client-contract/ClientContract';
import AddCampaign from './add-campaign/AddCampaign';
import UploadFiles from './UploadFiles';

function AddAdvertiser(props) {
  const stage = [
    { value: 1, component: ClientContract },
    { value: 2, component: AddCampaign },
    { value: 3, component: UploadFiles },
  ]
  const { step } = props.form;
  return (
    <>
      <Row className="d-flex justify-content-center">
        <div className="steps-container">
          {
            stage.map((item, key) => <div key={key} className={`step ${step >= item.value ? 'step-active' : null}`}>step {item.value}</div>)
          }
        </div>
      </Row>
      {
        stage.map((item, key) => item.value === step ? <item.component key={key} /> : null)
      }
    </>
  );
}

const select = store => store;
export default connect(select)(AddAdvertiser);
