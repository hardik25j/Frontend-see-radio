import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Row } from 'reactstrap';
import { InputBox } from './InpuxBox';

export const FilterHeader = (props) => {
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

export const FilterFooter = (props) => {
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
      // onClick={handleFilter}
      />
    </div>
  );
}