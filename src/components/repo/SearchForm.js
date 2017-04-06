import React, { Component, PropTypes } from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import "./search.css";

import {
  reposQuery,
  reposSort,
  fetchReposNow,
} from "../../actions/repos";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.onClickButton = this.onClickButton.bind(this);
  }

  onClickButton(query, sort) {
    const { dispatch, page } = this.props;
    dispatch(reposQuery(query))
    dispatch(reposSort(sort))
    dispatch(fetchReposNow(page, query, sort))
  }

  render() {
    const { handleSubmit, query = "", sort = "" } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <Field name="query" placeholder="Search GitHub" component="input" type="text" />
          <Field name="sort" component="select">
            <option>Sort by... </option>
            <option value="best-match">Best match</option>
            <option value="most-stars">Most stars</option>
            <option value="fewest-stars">Fewest stars</option>
            <option value="most-forks">Most forks</option>
            <option value="fewest-forks">Fewest forks</option>
            <option value="recently-updated">Recently updated</option>
            <option value="least-recently-updated">Least recently updated</option>
          </Field>
          <button type="submit"><i className="fa fa-search"></i></button>
        </div>
         {query}, {sort}
      </form>
    );
  }
}

// Decorate the form component
SearchForm = reduxForm({
  form: 'search', // a unique name for this form
})(SearchForm);

// Decorate with connect to read form values
export const selector = formValueSelector('search') // <-- same as form name
SearchForm = connect(
  state => {
    const query = selector(state, 'query')
    const sort = selector(state, 'sort')
    return {
      query,
      sort
    }
  }
)(SearchForm)

export default SearchForm;
