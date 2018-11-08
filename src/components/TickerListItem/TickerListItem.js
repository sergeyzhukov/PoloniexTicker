import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import PropTypes from 'prop-types'
import PercentIndicator from './img/change_indicator.png'

export default class TickerListItem extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    percentChange: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
    highestBid: PropTypes.string.isRequired,
  }

  render() {
    const { name, highestBid, percentChange, last } = this.props
    const [currency, secondCurrency] = name.split('_')
    const change = Number.parseFloat(percentChange) * 100
    const lastParsed =  Number.parseFloat(last)

    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.high}>High: {highestBid}</Text>
        </View>
        <View style={styles.valuesContainer}>
          <Text style={styles.last}>
            {(lastParsed >= 1) ? lastParsed.toFixed(4) : lastParsed.toFixed(8)} {currency}
          </Text>
          <View style={styles.changeContainer}>
            <Image
              style={change > 0 ? styles.indicatorUp : styles.indicatorDown }
              source={PercentIndicator}
            />
            <Text style={styles.change}>{change.toFixed(2)}%</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
  },
  valuesContainer: {
    alignItems: 'flex-end',
  },
  nameContainer: {
    flex: 1,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  change: {
    fontSize: 10,
    marginLeft: 2,
    color: '#777777',
  },
  indicatorUp: {
    tintColor: 'green',
    transform: [
      { scaleY: -1 },
    ],
  },
  indicatorDown: {
    tintColor: 'red',
  },
  last: {
    fontSize: 15,
    marginBottom: 4,
    color: '#333333',
  },
  high: {
    fontSize: 10,
    color: '#777777',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333333',
  }
})
