import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert, Switch, RefreshControl, TextInput, SectionList } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {useState, useEffect, useMemo, useCallback } from 'react'
import React from 'react'

import { Provider, useSelector, useDispatch } from 'react-redux'
import { store, RootState, AppDispatch } from './redux/store'
import {inc, dec, reset, incByAmount} from './redux/counterSlice'

const CounterScreen = () => {
  // doc du lieu tu redux store
  const count = useSelector(
    (state:RootState) => state.counter.value 
  )
  // Gửi action đến Redux store
  const dispatch = useDispatch<AppDispatch>();
}

export default function App() {
  return (
    <Provider store={store}>

    </Provider>
  );
}

const styles = StyleSheet.create({

});