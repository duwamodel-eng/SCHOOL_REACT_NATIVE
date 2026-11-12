import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, Button } from 'react-native';
import React, { Component } from 'react'

export class Bai1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Movie App</Text>
      </View>
    )
  }
}

export default Bai1

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
