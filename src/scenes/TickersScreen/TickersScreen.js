import React, { Component } from 'react'
import { ActivityIndicator, View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import Icon from 'react-native-vector-icons/Feather'
import { loadTickers } from '../../API/actions'
import { createTickersListSelector } from '../../API/selectors'
import TickerListItem from '../../components/TickerListItem'

export class TickersScreen extends Component {
  static navigationOptions = {
    tabBarLabel: 'Tickers',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="trending-up" size={22} color={tintColor} />
    ),
  }

  componentDidMount() {
    this.props.loadTickers()
    this.setPoolingTimerEnabled(true)
  }

  componentWillUnmount() {
    this.setPoolingTimerEnabled(false)
  }

  setPoolingTimerEnabled = enabled => {
    if (enabled) {
      if (this.poolingTimer) {
        return
      }
      this.poolingTimer = setInterval(this.props.loadTickers, 5000)
    } else {
      clearInterval(this.poolingTimer)
      this.poolingTimer = null
    }
  }

  handleTabBlur = () => {
    this.setPoolingTimerEnabled(false)
  }

  handleTabFocus = () => {
    this.setPoolingTimerEnabled(true)
  }

  renderItem = ({ item }) => {
    const { key, last, highestBid, percentChange} = item
    return (
      <TickerListItem
        name={key}
        last={last}
        highestBid={highestBid}
        percentChange={percentChange}
      />
    )
  }

  renderSeparator = () => (
    <View style={styles.separator} />
  )

  renderTableHeader = () => {
    const { isError, error } = this.props
    if (!isError) {
      return null
    }
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    )
  }

  render() {
    const { tickers, isFetching, isError } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <NavigationEvents
          onWillFocus={this.handleTabFocus}
          onWillBlur={this.handleTabBlur}
        />
        {tickers.length === 0 && isFetching && !isError
          ? <ActivityIndicator size="large" color="#0000ff" />
          : <FlatList
              data={tickers}
              style={styles.table}
              renderItem={this.renderItem}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderTableHeader}
              // no need to key extractor, we already have key inside item
            />
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  errorContainer: {
    backgroundColor: '#990000AA',
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 4,
    alignItems: 'center',
  },
  table: {
    flex: 1,
  },
  separator: {
    backgroundColor: '#C8C7CC',
    height: 0.5,
    marginLeft: 15,
  }
})

const mapStateToProps = createSelector(
  createTickersListSelector,
  tickers => tickers,
)

const mapDispatchToProps = { loadTickers }

export default connect(mapStateToProps, mapDispatchToProps)(TickersScreen)
