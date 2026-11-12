import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
export class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: 'https://reactnative.dev/img/header_logo.svg' }}  // source={require('./assets/logo.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.rcontainer}>
          <FontAwesome name="search" size={24} color="black" />
          <FontAwesome name="shopping-cart" size={24} color="black" />
        </View>
      </View>
    )
  }
}

export default Header

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    height: 56,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  rcontainer: {
    flexDirection: 'row',
    gap: 50
  },
  logoImage: {
    width: 40,
    height: 40
  }
})