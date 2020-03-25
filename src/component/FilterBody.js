import React, { Component } from "react";
import { Row } from "reactstrap";
import { InputBox, DropDownBox } from "../common-component/InpuxBox";
import DatePickerBox from "../common-component/DatePickerBox";

export default class FilterBody extends Component {
  render() {
    return (
      <>
        <div className="filter-body">
          <Row>
            <InputBox
              label="Keyword(s) / ID"
              type="text"
              name="keyWord"
              placeholder="Search"
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              className="w"
              label="Status"
              name="status"
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Actions Required By"
              name="actionReqBy"
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Due On/Before"
              name="startDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Start On/Before"
              name="startDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Start On/After"
              name="startDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Finish On/Before"
              name="startDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
            />
          </Row>
          <Row>
            <DatePickerBox
              label="Finish On/After"
              name="startDate"
              dateFormat="dd/MMM/yy"
              placeholder="dd/mm/yy"
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Salesperson"
              name="salesPerson"
            />
          </Row>
          <Row>
            <DropDownBox
              className="w"
              label="Advertiser"
              name="advertiser"
            />
          </Row>

        </div>
      </>
    );
  }
}