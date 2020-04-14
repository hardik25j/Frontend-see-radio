import React from "react";
import loading from '../../assets/image/thumb.gif';
import { connect } from "react-redux";

function Loader(props) {

  if (props.loader.apiLoader)
    return <div className="-loading -active">
      <div className="-loading-inner">
        <div className="d-flex justify-content-center align-items-center" >
          <img className="loader" src={loading} alt="Loading" />
          <span>Loading...</span>
        </div >
      </div>
    </div>
  else
    return null;
}

const select = store => store;
export default connect(select)(Loader);