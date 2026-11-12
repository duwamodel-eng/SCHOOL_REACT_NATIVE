import { useState } from "react";
import {StyleSheet, Text, View, ActivityIndicator, Button, Pressable } from "react-native";

type Variant = 'primary' | 'secondary' | 'outLine' | 'danger' 
type Size = 'small' | 'medium' | 'large'

interface MyType{
  title: string,
  variant: Variant,
  size: Size,
  onPress: () => void ,
  disable?: boolean,
  loading: boolean,
  icon?: React.ReactNode 
}

const AppButton = (props:MyType) =>{
  return(
    <>
      <Pressable>
        {props.loading?(<ActivityIndicator/>):(<Text>{props.title}</Text>)}
      </Pressable>
    </>
  )
}

export default function App() {
  
  return (
    <View>
      <AppButton loading={false} title='primary' variant='primary' size='small' onPress = {()=> console.log()} />
    </View>
  );
}

const styles = StyleSheet.create({
  
})