import React, { Component } from "react";
import loading from './assets/image/thumb.gif';

export default class Loader extends Component {
  render() {
    return (
      <div className="d-flex justify-content-center">
        <img src={loading} alt="Loading" />
        <span>Loading...</span>
      </div>
    );
  }
}