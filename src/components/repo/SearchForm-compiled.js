'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selector = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxForm = require('redux-form');

var _reactRedux = require('react-redux');

require('./search.css');

var _repos = require('../../actions/repos');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchForm = function (_Component) {
  (0, _inherits3.default)(SearchForm, _Component);

  function SearchForm(props) {
    (0, _classCallCheck3.default)(this, SearchForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SearchForm.__proto__ || (0, _getPrototypeOf2.default)(SearchForm)).call(this, props));

    _this.onClickButton = _this.onClickButton.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(SearchForm, [{
    key: 'onClickButton',
    value: function onClickButton(query, sort) {
      var _props = this.props,
          dispatch = _props.dispatch,
          page = _props.page;

      dispatch((0, _repos.reposQuery)(query));
      dispatch((0, _repos.reposSort)(sort));
      dispatch((0, _repos.fetchReposNow)(page, query, sort));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          handleSubmit = _props2.handleSubmit,
          _props2$query = _props2.query,
          query = _props2$query === undefined ? "" : _props2$query,
          _props2$sort = _props2.sort,
          sort = _props2$sort === undefined ? "" : _props2$sort;

      return _react2.default.createElement(
        'form',
        { onSubmit: handleSubmit },
        _react2.default.createElement(
          'div',
          { className: 'input-group' },
          _react2.default.createElement(_reduxForm.Field, { name: 'query', placeholder: 'Search GitHub', component: 'input', type: 'text' }),
          _react2.default.createElement(
            _reduxForm.Field,
            { name: 'sort', component: 'select' },
            _react2.default.createElement(
              'option',
              null,
              'Sort by... '
            ),
            _react2.default.createElement(
              'option',
              { value: 'best-match' },
              'Best match'
            ),
            _react2.default.createElement(
              'option',
              { value: 'most-stars' },
              'Most stars'
            ),
            _react2.default.createElement(
              'option',
              { value: 'fewest-stars' },
              'Fewest stars'
            ),
            _react2.default.createElement(
              'option',
              { value: 'most-forks' },
              'Most forks'
            ),
            _react2.default.createElement(
              'option',
              { value: 'fewest-forks' },
              'Fewest forks'
            ),
            _react2.default.createElement(
              'option',
              { value: 'recently-updated' },
              'Recently updated'
            ),
            _react2.default.createElement(
              'option',
              { value: 'least-recently-updated' },
              'Least recently updated'
            )
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit' },
            _react2.default.createElement('i', { className: 'fa fa-search' })
          )
        ),
        query,
        ', ',
        sort
      );
    }
  }]);
  return SearchForm;
}(_react.Component);

// Decorate the form component


SearchForm = (0, _reduxForm.reduxForm)({
  form: 'search' })(SearchForm);

// Decorate with connect to read form values
var selector = exports.selector = (0, _reduxForm.formValueSelector)('search'); // <-- same as form name
SearchForm = (0, _reactRedux.connect)(function (state) {
  var query = selector(state, 'query');
  var sort = selector(state, 'sort');
  return {
    query: query,
    sort: sort
  };
})(SearchForm);

exports.default = SearchForm;

//# sourceMappingURL=SearchForm-compiled.js.map