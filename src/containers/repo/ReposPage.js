import React, { Component, PropTypes } from "react";
import shallowCompare from "react-addons-shallow-compare";
import { connect } from "react-redux";
import classNames from "classnames";
import SearchForm from './../../components/repo/SearchForm';

import { AutoSizer, Table, Column } from "react-virtualized";

import {
  reposQuery,
  reposSort,
  reposOrder,
  invalidateReposPage,
  selectReposPage,
  fetchReposIfNeeded
} from "../../actions/repos";

import "react-virtualized/styles.css";
import "./repo.css";

class ReposPage extends Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.getNoRowsRenderer = this.getNoRowsRenderer.bind(this);
    this.getRowClassName = this.getRowClassName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { dispatch, page, query, sort, order } = this.props;
    dispatch(fetchReposIfNeeded(page, query, sort, order));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, page, query, sort, order } = nextProps;
    dispatch(fetchReposIfNeeded(page, query, sort, order));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  getNoRowsRenderer() {
    return (
      <div className="noRows">
        No rows
      </div>
    );
  }

  getRowClassName({ index }) {
    if (index < 0) {
      return "headerRow";
    }
    return index % 2 === 0 ? "evenRow" : "oddRow";
  }

  handleNextPageClick(e) {
    e.preventDefault();
    const { page, repos } = this.props;
    if (repos.length > 0) {
      // go to next page only if more data may be available
      this.props.dispatch(selectReposPage(page + 1));
    }
  }

  handlePreviousPageClick(e) {
    e.preventDefault();
    const page = this.props.page;
    if (page > 1) {
      this.props.dispatch(selectReposPage(page - 1));
    }
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch, page } = this.props;
    dispatch(invalidateReposPage(page));
  }

  ownerCellRenderer = (
    { cellData, cellDataKey, columnData, rowData, rowIndex }
  ) => (
    <a href={cellData.html_url} target="_blank">
      <img src={cellData.avatar_url} width="32" height="32" alt="owner" />
      <span style={{ marginLeft: "0.5em" }}>{cellData.login}</span>
    </a>
  );

  linkCellRenderer = (
    { cellData, cellDataKey, columnData, rowData, rowIndex }
  ) => <a href={cellData} target="_blank">{cellData}</a>;

  stargazerCellRenderer = (
    { cellData, cellDataKey, columnData, rowData, rowIndex }
  ) => (
    <span className="pull-right">
      {cellData.toLocaleString()}
      {" "}
      <i className="fa fa-star" style={{ color: "gold" }} />
      {" "}
    </span>
  );

  handleSubmit(e) {
    const { dispatch, page } = this.props;
    let sortOut = "default";
    let orderOut = "desc";
    console.log(e.sort)
    if (e.sort === "most-stars") {
      sortOut = "stars";
      orderOut = "desc";
    } else if (e.sort === "fewest-stars") {
      sortOut = "stars";
      orderOut = "asc";
    } else if (e.sort === "most-forks") {
      sortOut = "forks";
      orderOut = "desc";
    } else if (e.sort === "fewest-forks") {
      sortOut = "forks";
      orderOut = "asc";
    } else if (e.sort === "recently-updated") {
      sortOut = "updated";
      orderOut = "desc";
    } else if (e.sort === "least-recently-updated") {
      sortOut = "updated";
      orderOut = "asc";
    }
    dispatch(reposQuery(e.query))
    dispatch(reposSort(sortOut))
    dispatch(reposOrder(orderOut))
    dispatch(invalidateReposPage(page));
  }

  render() {
    const { page, error, repos, isFetching } = this.props;
    const prevStyles = classNames("page-item", { disabled: page <= 1 });
    const nextStyles = classNames("page-item", {
      disabled: repos.length === 0
    });

    return (
      <div className="container">
      <SearchForm onSubmit={this.handleSubmit} />
        <nav>
          <ul className="pagination pagination-sm">
            <li className={prevStyles}>
              <a
                className="page-link"
                href="#"
                onClick={this.handlePreviousPageClick}
              >
                <span>Previous</span>
              </a>
            </li>
            {!isFetching &&
              <li className="page-item">
                <a
                  className="page-link"
                  href="#"
                  onClick={this.handleRefreshClick}
                >
                  <span>Refresh page {page}</span>
                </a>
              </li>}
            {isFetching &&
              <li className="page-item">
                <span className="page-link">
                  <i className="fa fa-refresh fa-spin" /> Refreshing page {page}
                </span>
              </li>}
            <li className={nextStyles}>
              <a
                className="page-link"
                href="#"
                onClick={this.handleNextPageClick}
              >
                <span>Next</span>
              </a>
            </li>
          </ul>
        </nav>

        {error &&
          <div className="alert alert-danger">
            {error.message || "Unknown errors."}
          </div>}

        {!isFetching &&
          repos.length === 0 &&
          <div className="alert alert-warning">Oops, nothing to show.</div>}

        {repos &&
          <div
            className="container"
            ref="TABLE_DIV"
            style={{
              opacity: isFetching ? 0.5 : 1,
              width: "100%",
              height: "80vh",
              position: "absolute"
            }}
          >
            <AutoSizer>
              {({ width, height }) => (
                <Table
                  headerClassName={"headerColumn"}
                  noRowsRenderer={this.getNoRowsRenderer}
                  rowClassName={this.getRowClassName}
                  width={width}
                  height={height}
                  headerHeight={50}
                  rowHeight={50}
                  rowCount={repos.length}
                  rowGetter={({ index }) => repos[index]}
                >

                  <Column label="Repository" dataKey="name" width={200} />

                  <Column
                    label="Owner"
                    dataKey="owner"
                    cellRenderer={this.ownerCellRenderer}
                    width={200}
                  />

                  <Column
                    label="Stargazers"
                    dataKey="stargazers_count"
                    cellRenderer={this.stargazerCellRenderer}
                    width={150}
                  />

                  <Column label="Full Name" dataKey="full_name" width={400} />

                  <Column
                    label="Repository URL"
                    dataKey="html_url"
                    cellRenderer={this.linkCellRenderer}
                    width={400}
                  />

                  <Column
                    label="Description"
                    dataKey="description"
                    width={500}
                    flexGrow={1}
                  />
                </Table>
              )}
            </AutoSizer>
          </div>}
      </div>
    );
  }
}

ReposPage.propTypes = {
  page: PropTypes.number.isRequired,
  form: PropTypes.object,
  query: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  left: PropTypes.number,
  top: PropTypes.number
};

function mapStateToProps(state, props) {
  const { selectedReposPage, reposByPage, reposQuery, reposSort, form } = state;
  const page = selectedReposPage || 1;
  const query = reposQuery || "github";
  const sort = reposSort || "stars"
  if (!reposByPage[page]) {
    return {
      page,
      form,
      query,
      sort,
      error: null,
      isFetching: false,
      didInvalidate: false,
      totalCount: 0,
      repos: []
    };
  }

  return {
    page,
    form,
    query,
    sort,
    error: reposByPage[page].error,
    isFetching: reposByPage[page].isFetching,
    didInvalidate: reposByPage[page].didInvalidate,
    totalCount: reposByPage[page].totalCount,
    repos: reposByPage[page].repos
  };
}

export default connect(mapStateToProps)(ReposPage);
