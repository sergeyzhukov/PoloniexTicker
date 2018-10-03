import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Provider } from 'react-redux'
import createStore from './store/createStore'
import AboutScreen from './scenes/AboutScreen'
import TickersScreen from './scenes/TickersScreen'

const RootStack = createBottomTabNavigator({
  Tickers: TickersScreen,
  About: AboutScreen,
})

const store = createStore()

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    )
  }
}