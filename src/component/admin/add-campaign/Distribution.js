import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Row, Col } from "reactstrap";
import DatePickerBox from "../../common-component/DatePickerBox";
import { getApi } from "../../../utils/interceptors";
import { toast } from "react-toastify";
import InputBox from "../../common-component/InpuxBox";
import DropDownBox from '../../common-component/DropDownBox';

function Distribution(props) {
  const { isReq, data, errors, handleChange, onFieldValidate, changeDropDown, changeDuration, changeDate } = props;
  const { views, startDate, endDate, duration, timeSpan } = data;
  const [targetMarketList, setTargetMarketList] = useState([]);
  const timeSpanList = [
    { label: 'Days', value: 'days' },
    { label: 'Weeks', value: 'weeks' },
    { label: 'Month', value: 'months' }
  ];

  useEffect(() => {
    getApi(`api/company/salesOrg/${localStorage.companyId}`)
      .then(response => {
        let list = [];
        const { id, name } = response.data.salesOrgCompany.Market
        list = [...list, { value: id, label: name }];
        setTargetMarketList(list);
      })
      .catch(response => toast.error(response.errorMessage))
  }, [])

  return (
    <>
      <Row>
        <Col>
          <DropDownBox
            label="Target Market"
            name="targetMarket"
            isReq={isReq}
            list={targetMarketList}
            error={errors.targetMarket}
            onChange={changeDropDown}
          />
        </Col>
        <Col>
          <InputBox
            label="Views"
            name="views"
            type="number"
            isReq={isReq}
            placeholder="Minimum value is 2500"
            value={views}
            error={errors.views}
            onChange={handleChange}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
      <Row>
        <Col lg='5'>
          <DatePickerBox
            label="Start Date"
            name="startDate"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            isReq={isReq}
            value={startDate}
            error=''
            onChange={changeDate}
          />
        </Col>
      </Row>
      <Row>
        <Col lg='5'>
          <DatePickerBox
            label="Select End Date"
            name="endDate"
            dateFormat="dd/MMM/yy"
            placeholder="dd/mm/yy"
            isReq={isReq}
            value={endDate}
            error=''
            onChange={changeDate}
          />
        </Col>
        <Col>
          <DropDownBox
            label="Select"
            name="timeSpan"
            list={timeSpanList}
            value={timeSpan}
            onChange={changeDropDown}
          />
        </Col>
        <Col>
          <InputBox
            label="Duration"
            name="duration"
            type="text"
            placeholder="Enter the duration"
            value={duration}
            onChange={changeDuration}
            onBlur={onFieldValidate}
          />
        </Col>
      </Row>
    </>
  );
}

export default Distribution;

Distribution.defaultProps = {
  isReq: false,
  isDisabled: false
}

Distribution.propTypes = {
  isReq: PropTypes.bool,
  isDisabled: PropTypes.bool,
  data: PropTypes.object,
  error: PropTypes.string,
  handleChange: PropTypes.func,
  onFieldValidate: PropTypes.func,
  changeDropDown: PropTypes.func,
  changeDate: PropTypes.func,
  changeDuration: PropTypes.func
}