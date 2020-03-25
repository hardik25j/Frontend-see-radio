import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import { InputBox } from "../common-component/InpuxBox";
import FilterBody from "./FilterBody";

export default class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { handleFilter } = this.props
    return (
      <div className="filter-sidebar">
        <div className="filter-header">
          <FontAwesomeIcon
            icon={faSearch}
          /> Search Filter <FontAwesomeIcon
            icon={faTimes}
            onClick={handleFilter}
          />
        </div >
        <FilterBody />
        <div className="filter-footer">
          <div >
            <Row>
              <InputBox
                type="button"
                name="reset"
                className="btn btn-outline-secondary"
                value="Reset"
              // onClick={handleFilter}
              />
              <InputBox
                type="button"
                name="next"
                className="btn btn-primary"
                value="Next"
              // onClick={handleFilter}
              />
            </Row>
          </div>
        </div>
      </div >
    );
  }
}