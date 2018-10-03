import { createSelector } from 'reselect'
import { denormalize } from 'normalizr'
import Schemas from '../middleware/schemas'

export const createTickersListSelector = createSelector(
  state => state.tickers,
  tickers => ({
    isFetching: tickers.isFetching,
    isError: tickers.isError,
    error: tickers.error,
    tickers: Object.values(denormalize(tickers.result, Schemas.TICKER_ARRAY, tickers.entities)),
  }),
)