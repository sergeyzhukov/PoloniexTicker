import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import { autoRehydrate, persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import * as reducers from '../API/store'
import successToFailureMiddleware from './successToFailureMiddleware'

export default (rootReducer) => {
  const store = createStore(combineReducers(reducers), compose(
    applyMiddleware(apiMiddleware, successToFailureMiddleware),
    // autoRehydrate(),
  ))
  // persistStore(store, { storage: AsyncStorage })
  // temporary disabled persist
  return store
}
