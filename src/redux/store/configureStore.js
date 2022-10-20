import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION;
const thunkMiddleWare = applyMiddleware(thunk);
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers, thunkMiddleWare);
};
export default configureStore;
