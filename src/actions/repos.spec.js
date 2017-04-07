import * as actions from './repos';
import * as actionTypes from '../constants/actionTypes'

describe('actions', () => {

  describe('repos', () => {

    it('should set repositories query', () => {
      const query = 'electron'
      const expectedAction = {
        type: actionTypes.SET_REPOS_QUERY,
        query
      }

    expect(actions.reposQuery(query)).toEqual(expectedAction)
    });

    it('should set repositories sort', () => {
      const sort = 'stars'
      const expectedAction = {
        type: actionTypes.SET_REPOS_SORT,
        sort
      }

    expect(actions.reposSort(sort)).toEqual(expectedAction)
    });

    it('should set repositories order', () => {
      const order = 'desc'
      const expectedAction = {
        type: actionTypes.SET_REPOS_ORDER,
        order
      }

    expect(actions.reposOrder(order)).toEqual(expectedAction)
    });

    it('should select repositories page', () => {
      const page = '1'
      const expectedAction = {
        type: actionTypes.SELECT_REPOS_PAGE,
        page
      }

    expect(actions.selectReposPage(page)).toEqual(expectedAction)
    });

    it('should invalidate repositories page', () => {
      const page = '1'
      const expectedAction = {
        type: actionTypes.INVALIDATE_REPOS_PAGE,
        page
      }

    expect(actions.invalidateReposPage(page)).toEqual(expectedAction)
    });


  });
});
