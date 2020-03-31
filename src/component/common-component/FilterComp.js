import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import InputBox from './InpuxBox';

export function FilterHeader(props) {
  return (
    <div className="filter-header">
      <FontAwesomeIcon
        icon={faSearch}
      /> Search Filter <FontAwesomeIcon
        icon={faTimes}
        onClick={props.handleFilter}
      />
    </div >
  );
}

FilterHeader.propTypes = {
  handleFilter: PropTypes.func,
}

export function FilterFooter(props) {
  return (
    <div className="d-flex justify-content-around filter-footer">
      <InputBox
        type="button"
        name="reset"
        className="btn btn-outline-secondary"
        value="Reset"
        onClick={props.cleanFilter}
      />
      <InputBox
        type="button"
        name="next"
        className="btn btn-primary"
        value="Search"
        onClick={props.handleSearch}
      />
    </div>
  );
}

FilterFooter.propTypes = {
  handleSearch: PropTypes.func,
  handleFilter: PropTypes.func,
}
