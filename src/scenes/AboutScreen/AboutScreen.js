import React, { Component } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import ProfileImage from './img/profile.jpg'

const LINKEDIN_URL = 'https://www.linkedin.com/in/sergeyzhukov89'

export default class AboutScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'About',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="info" size={22} color={tintColor} />
    ),
  }

  handleLinkedinClick = () => {
    Linking.openURL(LINKEDIN_URL).catch(err => console.error('An error occurred', err))
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={ProfileImage} style={styles.profileImage} />
        <Text style={styles.name}>Sergey Zhukov</Text>
        <Text style={styles.description}>
          Mobile Apps and Server engineer. Cryptocurrency enthusiast.
          Objective-C, Swift, React Native, React and Javascript.
        </Text>
        <TouchableOpacity onPress={this.handleLinkedinClick}>
          <Text style={styles.linkedin}>Linkedin</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginTop: 16,
    fontWeight: '500',
  },
  linkedin: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    color: '#0000ff',
  },
  description: {
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  profileImage: {
    width: 176,
    height: 176,
    borderRadius: 88,
    marginTop: 64,
  }
})
