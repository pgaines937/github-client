import * as actionTypes from '../constants/actionTypes'

export function reposQuery(state = "", action) {
  switch (action.type) {
    case actionTypes.SET_REPOS_QUERY:
      return action.query;
    default:
      return state;
  }
}

export function reposSort(state = "", action) {
  switch (action.type) {
    case actionTypes.SET_REPOS_SORT:
      return action.sort;
    default:
      return state;
  }
}

export function reposOrder(state = "", action) {
  switch (action.type) {
    case actionTypes.SET_REPOS_ORDER:
      return action.order;
    default:
      return state;
  }
}

export function selectedReposPage(state = 1, action) {
  switch (action.type) {
    case actionTypes.SELECT_REPOS_PAGE:
      return action.page;
    default:
      return state;
  }
}

function repos(
  state = {
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    repos: [],
    error: null
  },
  action
) {
  switch (action.type) {
    case actionTypes.INVALIDATE_REPOS_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case actionTypes.REPOS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case actionTypes.REPOS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.total_count,
        repos: action.repos,
        error: null
      });
    case actionTypes.REPOS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    default:
      return state;
  }
}

export function reposByPage(state = {}, action) {
  switch (action.type) {
    case actionTypes.INVALIDATE_REPOS_PAGE:
    case actionTypes.REPOS_REQUEST:
    case actionTypes.REPOS_SUCCESS:
    case actionTypes.REPOS_FAILURE:
      return Object.assign({}, state, {
        [action.page]: repos(state[action.page], action)
      });
    default:
      return state;
  }
}
