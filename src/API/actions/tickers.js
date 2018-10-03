import { CALL_API, getJSON } from 'redux-api-middleware'
import { normalize } from 'normalizr'
import Schemas from '../middleware/schemas'

const NAME = 'loadTickers'

// endpoint base is hardcoded to simplicity
export function loadTickers() {
  return {
    [CALL_API]: {
      endpoint: 'https://poloniex.com/public?command=returnTicker',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [{
        type: 'REQUEST',
        meta: { source: NAME },
      }, {
        type: 'SUCCESS',
        payload: (action, state, res) => (
          getJSON(res).then(json => json.error ? json : normalize(json, Schemas.TICKER_ARRAY))
        ),
        meta: { source: NAME },
      }, {
        type: 'FAILURE',
        meta: { source: NAME },
      }],
    },
  }
}
