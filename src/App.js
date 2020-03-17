import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <>
        <h1>hello</h1>
        <Redirect to="/dashboard" />
      </>

    );
  }
}

export default App;
