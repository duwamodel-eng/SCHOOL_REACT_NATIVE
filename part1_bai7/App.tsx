import { useState } from "react";
import {StyleSheet, Text, View, ActivityIndicator, Button, Pressable } from "react-native";


type Gender='male' | 'female' | 'other'


export default function App() {
  const [gender,setgender]=useState<Gender>('male')
  return (
    <View>
      <Pressable style={gender=='male' && styles.male} onPress={()=>setgender('male')}>
        <Text>male</Text>
      </Pressable>  
      <Pressable style={gender=='female' && styles.female} onPress={()=>setgender('female')}>
        <Text>female</Text>
      </Pressable> 
      <Pressable style={gender=='other' && styles.other} onPress={()=>setgender('other')}>
        <Text>other</Text>
      </Pressable>  
      <Text>{gender}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  male:{
    backgroundColor: 'red'
  },
  female:{
    backgroundColor: 'green'
  },
  other:{
    backgroundColor: 'orange'
  }
})