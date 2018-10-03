export default function successToFailureMiddleware() {
  return next => action => {
    if (action.type && action.type === 'SUCCESS') {
      const { meta, payload = {} } = action
      if (payload.error) {
        console.log(`ERROR: ${JSON.stringify(action)}`)

        return next({ meta, payload, type: 'FAILURE' })
      }
    }

    return next(action)
  }
}
