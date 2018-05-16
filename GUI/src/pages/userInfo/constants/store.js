import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
const Trunk = require('redux-thunk').default;

const store = (initialState => {
    const createStoreWithMiddleware = applyMiddleware(Trunk)(createStore);
    const store = createStoreWithMiddleware(reducer, initialState);
    return store;
})({});

export default store;