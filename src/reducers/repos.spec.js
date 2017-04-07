import * as reducers from './repos';
import * as actionTypes from '../constants/actionTypes'

describe('reducers', () => {

  describe('repos', () => {

    it('should handle SET_REPOS_QUERY', () => {
      expect(
        reducers.reposQuery([], {
          type: actionTypes.SET_REPOS_QUERY,
          query: 'electron'
        })
      ).toEqual(
        'electron'
      )
    })

    it('should handle SET_REPOS_SORT', () => {
      expect(
        reducers.reposSort([], {
          type: actionTypes.SET_REPOS_SORT,
          sort: 'stars'
        })
      ).toEqual(
        'stars'
      )
    })

    it('should handle SET_REPOS_ORDER', () => {
      expect(
        reducers.reposOrder([], {
          type: actionTypes.SET_REPOS_ORDER,
          order: 'desc'
        })
      ).toEqual(
        'desc'
      )
    })

    it('should handle SELECT_REPOS_PAGE', () => {
      expect(
        reducers.selectedReposPage([], {
          type: actionTypes.SELECT_REPOS_PAGE,
          page: '1'
        })
      ).toEqual(
        '1'
      )
    })

  })
})
