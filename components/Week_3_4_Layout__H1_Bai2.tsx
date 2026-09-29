import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component, useState, useEffect } from 'react'

export class Week_3_4_Layout_Bai2 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            source={{ uri: 'https://reactnative.dev/img/header_logo.svg' }}
            style={styles.img}
          />
        </View>
        <View style={styles.info}>

          <View style={styles.tenSach}>
            <Text style={styles.colorText}>Ten sach: Doremon</Text>
          </View>

          <View style={styles.tacgia}>
            <Text style={styles.colorText}>Tac gia: Nguyen Van A</Text>
          </View>

          <View style={styles.giatien}>
            <Text style={styles.colorText}>Gia tien: 200$</Text>
          </View>

        </View>
      </View>
    )
  }
}

export default Week_3_4_Layout_Bai2

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    width: '100%',
    height: '40%',
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 10,
  },

  image: {
    backgroundColor: 'pink',
    width: '40%',
    height: '90%',

  },

  info: {
    backgroundColor: 'orange',
    width: '60%',
    height: '70%',
    flexDirection: 'column',
    gap: 30,
    paddingTop: 20,
    paddingLeft: 20
  },

  img: {
    width: '100%',
    height: '100%'
  },

  tenSach: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'dashed'
  },

  tacgia: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'dashed'
  },

  giatien: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
    borderStyle: 'dashed'
  },

  colorText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'red'
  }

})