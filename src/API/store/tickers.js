import { union, merge, set } from 'lodash'
import ActionTypes from '../middleware/actionTypes'

const initialState = {
  entities: {},
  result: [],
  isFetching: false,
  isError: false,
  error: undefined,
}

/* eslint import/prefer-default-export: 0 */
export function tickers(state = initialState, action) {
  const { type, payload = {} } = action

  if (!action.meta) {
    return state
  }

  if (action.meta.source === 'loadTickers') {
    switch (type) {
      case 'SUCCESS':
        return {
          entities: payload.entities,
          result: payload.result,
          isFetching: false,
          isError: false,
          error: undefined,
        }
      case 'REQUEST':
        return {
          ...state,
          isFetching: true,
        }
      case 'FAILURE':
        return {
          ...state,
          isFetching: false,
          isError: true,
          error: payload.error,
        }
      default:
        break
    }
  }

  return state
}
