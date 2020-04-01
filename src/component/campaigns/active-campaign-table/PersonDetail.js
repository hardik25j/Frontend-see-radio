import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';
import { getApi } from '../../../utils/interceptors';

class PersonDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      state: '',
      person: [],
      companyData: [],
      Address: []
    }
  }
  getDetails = (id) => {
    getApi(`api/person/get/${id}`)
      .then(response => {
        const { provinceID, country } = response.data.person.Address;
        this.getState(provinceID, country);
        this.setState({
          id: id,
          person: response.data.person,
          companyData: response.data.companyData,
          Address: response.data.person.Address,
        })
      }).catch((response) => {
        response && toast.error(response.errorMessage);
      });
  }

  getState = (id, country) => {
    getApi(`pub/states/${country}`)
      .then(response => {
        let state = response.data.filter(item => item.id === id);
        this.setState({ state: state[0].name })
      })
      .catch((response) => {
        response && toast.error(response.errorMessage);
      });
  }

  componentWillReceiveProps(nextProps) {
    const { id } = this.state;
    if (nextProps.modal === true) {
      if (nextProps.id !== id)
        this.getDetails(nextProps.id);
    }
  }

  render() {
    const { className, modal, toggle } = this.props;
    const { person, companyData, Address, state } = this.state;
    const { firstName, lastName, roleCode, email, phone } = person;
    const { address, address2, city, country, postal } = Address;
    const { companyName } = companyData;

    return (
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>{firstName} {lastName}</ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-lg-6">
                <h6 className="modal-label"> Company Name </h6>
                <div>{companyName} </div>
              </div>
              <div className="col-lg-6">
                <h6 className="modal-label"> Role </h6>
                <div> {roleCode} </div>
              </div>
            </div>
            <br />
            <h4 className="modal-title">
              Contact Information
            </h4>
            <div className="row">
              <div className="col-lg-6">
                <h6 className="modal-label"> Address </h6>
                <div>{address} {address2} </div>
                <div>{city} </div>
                <div>{country == 'CA' ? 'Canada' : "America"} </div>
                <div>{state} </div>
                <div>{postal} </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <h6 className="modal-label"> Email </h6>
                    <div>{email} </div>
                  </div>
                  <div className="col-lg-12 ">
                    <h6 className="modal-label"> Phone </h6>
                    <div>{phone} </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

}

export default PersonDetail;

PersonDetail.propTypes = {
  modal: PropTypes.bool,
  id: PropTypes.string,
  toggle: PropTypes.func
}