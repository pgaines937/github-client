import { callApi } from "../utils/apiUtils";

export const SET_REPOS_QUERY = "SET_REPOS_QUERY";
export const SET_REPOS_SORT = "SET_REPOS_SORT";
export const SET_REPOS_ORDER = "SET_REPOS_ORDER";
export const SELECT_REPOS_PAGE = "SELECT_REPOS_PAGE";
export const INVALIDATE_REPOS_PAGE = "INVALIDATE_REPOS_PAGE";

export const REPOS_REQUEST = "REPOS_REQUEST";
export const REPOS_SUCCESS = "REPOS_SUCCESS";
export const REPOS_FAILURE = "REPOS_FAILURE";

export function reposQuery(query) {
  return {
    type: SET_REPOS_QUERY,
    query
  };
}

export function reposSort(sort) {
  return {
    type: SET_REPOS_SORT,
    sort
  };
}

export function reposOrder(order) {
  return {
    type: SET_REPOS_ORDER,
    order
  };
}

export function selectReposPage(page) {
  return {
    type: SELECT_REPOS_PAGE,
    page
  };
}

export function invalidateReposPage(page) {
  return {
    type: INVALIDATE_REPOS_PAGE,
    page
  };
}

function reposRequest(page) {
  return {
    type: REPOS_REQUEST,
    page
  };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function reposSuccess(page) {
  return function(payload) {
    return {
      type: REPOS_SUCCESS,
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
      type: REPOS_FAILURE,
      page,
      error
    };
  };
}

const API_ROOT = "https://api.github.com";

function fetchRepos(page, query = "stars:>10000", sort = "stars", order = "desc") {
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

export function fetchReposIfNeeded(page, query, sort) {
  return (dispatch, getState) => {
    if (shouldFetchRepos(getState(), page)) {
      return dispatch(fetchRepos(page, query, sort));
    }
  };
}

export function fetchReposNow(page, query, sort) {
  return (dispatch) => {
      return dispatch(fetchRepos(page, query, sort));
  };
}

export function setReposSearchTerms(query = "stars:>10000", sort, order = "desc") {
  return (dispatch) => {
    let sortOut = "stars";
    let orderOut = "desc";
    if (sort === "most-stars") {
      sortOut = "stars";
      orderOut = "desc";
    } else if (sort === "fewest-stars") {
      sortOut = "stars";
      orderOut = "asc";
    } else if (sort === "most-forks") {
      sortOut = "forks";
      orderOut = "desc";
    } else if (sort === "fewest-forks") {
      sortOut = "forks";
      orderOut = "asc";
    } else if (sort === "recently-updated") {
      sortOut = "updated";
      orderOut = "desc";
    } else if (sort === "least-recently-updated") {
      sortOut = "updated";
      orderOut = "asc";
    }
    reposQuery(query)
    reposSort(sortOut)
    reposOrder(orderOut)
  }
}
