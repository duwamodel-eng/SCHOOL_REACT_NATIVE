import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, Text, Button, FlatList, ActivityIndicator, } from 'react-native';
import React, { Component, useState, useEffect } from 'react'



interface IMovie {
  id: string,
  title: string,
  gerne: string,
  year: number,
  rating: number,
  poster: string,
  isShowing: boolean
}

const url = 'https://6abba46eb2118ed7abb91ee1.mockapi.io/movies';

const ShowData = ({ data }: { data: IMovie[] }) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }: { item: IMovie }) => {
          return (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.rating}</Text>
              <Text>{item.isShowing ? 'Dang chieu' : 'ngung chieu'}</Text>
            </View>
          )
        }}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const Bai2 = () => {

  const [data, setdata] = useState<IMovie[] | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setdata(data as IMovie[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {data ?
        (<ShowData data={data} />) :
        (<View>
          <ActivityIndicator size='large' />
          <Text>dang tai du lieu</Text>
        </View>)
      }
    </View>
  )
}

export default Bai2

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
