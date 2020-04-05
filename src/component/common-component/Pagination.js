import React, { Component } from "react";

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: '',
      activePage: '',
      offset: 0,
      resultPages: [10, 20, 50],
      resultSelectedPage: 10
    }
  }

  resultPerPage = (val) => {
    const { offset } = this.state;
    this.setState({
      resultSelectedPage: val
    }, () => this.props.paginationFunction(offset, val));
  }

  render() {
    const { resultPages, resultSelectedPage } = this.state;
    return (
      <>
        <div className="pagination-container">
          <div className="record-per-page">
            <div className="mt-2">Result Per Page:</div>
            <div className="d-flex">
              {
                resultPages.map((item) => <div key={item}
                  onClick={() => this.resultPerPage(item)}
                  className={
                    resultSelectedPage === item
                      ? "page-button button-active"
                      : "page-button"
                  }
                >{item}</div>
                )
              }
            </div>
          </div>
        </div>
      </>
    );
  }
}