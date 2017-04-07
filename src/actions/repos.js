import { callApi } from "../utils/apiUtils";
import * as actionTypes from "../constants/actionTypes"

export function reposQuery(query) {
  return {
    type: actionTypes.SET_REPOS_QUERY,
    query
  };
}

export function reposSort(sort) {
  return {
    type: actionTypes.SET_REPOS_SORT,
    sort
  };
}

export function reposOrder(order) {
  return {
    type: actionTypes.SET_REPOS_ORDER,
    order
  };
}

export function selectReposPage(page) {
  return {
    type: actionTypes.SELECT_REPOS_PAGE,
    page
  };
}

export function invalidateReposPage(page) {
  return {
    type: actionTypes.INVALIDATE_REPOS_PAGE,
    page
  };
}

function reposRequest(page) {
  return {
    type: actionTypes.REPOS_REQUEST,
    page
  };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function reposSuccess(page) {
  return function(payload) {
    return {
      type: actionTypes.REPOS_SUCCESS,
      page,
      repos: payload.items,
      totalCount: payload.total_count
    };
  };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function reposFailure(page) {
  return function(error) {
    return {
      type: actionTypes.REPOS_FAILURE,
      page,
      error
    };
  };
}

const API_ROOT = "https://api.github.com";

function fetchRepos(page, query = "stars:>10000", sort = "default", order = "desc") {
  const url = `${API_ROOT}/search/repositories?q=${query}&sort=${sort}&order=${order}&page=${page}`;
  return callApi(
    url,
    null,
    reposRequest(page),
    reposSuccess(page),
    reposFailure(page)
  );
}

function shouldFetchRepos(state, page) {
  // Check cache first
  const repos = state.reposByPage[page];
  if (!repos) {
    // Not cached, should fetch
    return true;
  }

  if (repos.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return repos.didInvalidate;
}

export function fetchReposIfNeeded(page, query, sort, order) {
  return (dispatch, getState) => {
    if (shouldFetchRepos(getState(), page)) {
      return dispatch(fetchRepos(page, query, sort, order));
    }
  };
}
