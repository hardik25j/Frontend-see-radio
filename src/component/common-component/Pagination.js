import React, { Component } from "react";

const defaultButton = props => <button {...props}>{props.children}</button>;

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: '',
      activePage: '',
      offset: 0,
      resultPages: [10, 20, 50],
      resultSelectedPage: 10,
      visiblePages: this.getVisiblePages(null, this.pages)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { offset, resultSelectedPage } = this.state;
    const { totalResults } = nextProps;
    if (nextProps !== this.props) {
      let pages = Math.ceil(totalResults / resultSelectedPage);
      let activePage = (offset + resultSelectedPage) / resultSelectedPage;
      this.setState({
        visiblePages: this.getVisiblePages(this.props.pages, pages),
        pages: pages,
        activePage: activePage
      }, () => this.changePage(activePage));
    }
  }

  resultPerPage = (val) => {
    const { offset } = this.state;
    this.setState({
      resultSelectedPage: val
    }, () => this.props.paginationFunction(offset, val));
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages);
  };

  getVisiblePages = (page, total) => {
    if (total < 7)
      return this.filterPages([1, 2, 3, 4, 5, 6], total);
    else if (page % 10 >= 0 && page > 4 && page + 2 < total)
      return [1, page - 1, page, page + 1, total];
    else if (page % 10 >= 0 && page > 4 && page + 2 >= total)
      return [1, total - 3, total - 2, total - 1, total];
    else
      return [1, 2, 3, 4, 5, total];
  }

  changePage = (page) => {
    const { pages, activePage, resultSelectedPage } = this.state;
    if (page === activePage) {
      return;
    }
    const visiblePages = this.getVisiblePages(page, pages);
    const offset = (page * 10) - 10;
    this.setState({
      visiblePages: this.filterPages(visiblePages, pages),
      activePage: page,
      offset: offset
    });
    this.props.paginationFunction(offset, resultSelectedPage);
  }

  render() {
    const { PageButtonComponent = defaultButton, previousText } = this.props;
    const { visiblePages, activePage, pages, resultPages, resultSelectedPage } = this.state;

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
                      ? "table-page-button table-page-button-active"
                      : "table-page-button"
                  }
                >{item}</div>
                )
              }
            </div>
          </div>
          <div className="table-pagination">
            <div>
              <PageButtonComponent
                className="table-page-button"
                onClick={() => activePage === 1 ? null : this.changePage(activePage - 1)}
                disabled={activePage === 1 || pages == 0}
              >
                {previousText}
              </PageButtonComponent>
            </div>
            <div>
              {
                visiblePages.map((page, index, array) => <PageButtonComponent key={page}
                  className={
                    activePage === page
                      ? "table-page-button table-page-button-active"
                      : "table-page-button"
                  }
                  onClick={() => this.changePage(page)}
                >
                  {array[index - 1] + 2 < page ? `...${page}` : page}
                </PageButtonComponent>
                )
              }
            </div>
            <div >
              <PageButtonComponent
                className="table-page-button"
                onClick={() => activePage === pages ? null : this.changePage(activePage + 1)}
                disabled={activePage === pages || pages == 0}
              >
                {this.props.nextText}
              </PageButtonComponent>
            </div>
          </div>
        </div>
      </>
    );
  }
}