import { expect } from 'chai';
import reducer from './repos';

describe('reducers', () => {

  describe('repos', () => {

    it('should handle SET_REPOS_QUERY', () => {
      const action = {
        type: 'SET_REPOS_QUERY',
        payload: {
          query: 'electron'
        }
      };
      const test = Object.assign({}, action.payload);
      expect(reducer({}, action)).to.deep.equal(test);
    });

  });

});
