import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from "redux-thunk";
import createLogger from "redux-logger";
import { selectedReposPage, reposByPage } from "../reducers/repos";

const logger = createLogger();
const rootReducer = combineReducers({
  selectedReposPage,
  reposByPage,
  form: formReducer
});

const initialState = {};

export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  return store;
}
