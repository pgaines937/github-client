import * as actions from './repos';

describe('actions', () => {

  describe('repos', () => {

    it('should search for query', () => {
      const query = 'electron'
      const expectedAction = {
        type: actions.SET_REPOS_QUERY,
        query
      }

    expect(actions.reposQuery(query)).toEqual(expectedAction)
      //expect(store.getActions()).deep.equal(expectedActions);
    });

  });
});
