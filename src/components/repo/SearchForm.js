import React, { Component, PropTypes } from "react";
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'

import {
  reposQuery,
  fetchReposNow,
} from "../../actions/repos";

import "./search.css";

class SearchForm extends Component {
  constructor(props) {
    super(props);

  }
  static propTypes = {
    handleSubmit: PropTypes.func,
    fields: PropTypes.array
  }

  render() {
    const { fields: {searchQuery, sort}, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(handleSubmit)}>
        <div className="input-group">
          <label htmlFor="search"></label>
          <Field placeholder="Search GitHub" name="searchQuery" component="input" type="text"/>
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
      </form>
    );
  }
}

// Decorate the form component
SearchForm = reduxForm({
  form: 'search', // a unique name for this form
  fields: ['searchQuery', 'sort']
})(SearchForm);

// Decorate with connect to read form values
const selector = formValueSelector('search') // <-- same as form name
SearchForm = connect(
  state => {
    const { searchQuery, sort } = selector(state, 'searchQuery', 'sort')
    return {
      searchQuery,
      sort
    }
  }
)(SearchForm)

export default SearchForm;
