import { schema } from 'normalizr'

const ticker = new schema.Entity('ticker', {}, {
  processStrategy: (entity, parent, key) => {
    return ({ key, ...entity })
  }
})

export default {
  TICKER: ticker,
  TICKER_ARRAY: new schema.Values(ticker),
}
