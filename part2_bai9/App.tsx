import { useState, useEffect } from "react";
import {StyleSheet, Text, View, ActivityIndicator, Button, Pressable, FlatList } from "react-native";

interface Iprop{
  "userId": Number,
  "id": Number,
  "title": String,
  "completed": Boolean
}

const url='https://jsonplaceholder.typicode.com/todos'


const ShowDataByMap=({data}:{data:Iprop[]})=>{
  return(
    <View>
      {
        data.map((item)=>{
        return(
          <>
            <Text>"userId": {item.userId}</Text>
            <Text>"id": {item.id}</Text>
            <Text>"title": {item.title}</Text>
            <Text>"completed": {item.completed?'true':'false'}</Text>
          </>
        )
      })
      }
    </View>
  )
}

const ShowDataByFlatlist=({data}:{data:Iprop[]})=>{
  return(
    <View>
      <FlatList 
        data={data}
        renderItem={({item}:{item:Iprop})=>{
          return(
            <>
              <Text>"userId": {item.userId}</Text>
              <Text>"id": {item.id}</Text>
              <Text>"title": {item.title}</Text>
              <Text>"completed": {item.completed?'false':'true'}</Text>
            </>
          )
        }}
        keyExtractor={item=>item.id.toString()}
      />
    </View>
  )
}



export default function App() {
  const [data,setdata] = useState<Iprop[]|null>(null)
  useEffect(()=>{
    var fn=fetch(url)
    .then((res)=>{
      return res.json()
    })
    .then((data)=>{
      setdata(data as Iprop[])
    })
  },[])
  
  return (
    <View>
      // {data && <ShowDataByMap data={data}/>}
      {data && <ShowDataByFlatlist data={data}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  
})