import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';


interface IMovie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}


const url =
  'https://6abba46eb2118ed7abb91ee1.mockapi.io/movies';


const ShowData = ({ data }: { data: IMovie[] }) => {

  const handleSelect = (id: string) => {

    const movie = data.find((item) => item.id === id);

    if (movie) {
      Alert.alert('Movie', movie.title);
    }

  };

  return (
    <View>

      <FlatList
        data={data}

        renderItem={({ item }: { item: IMovie }) => {

          return (
            <MovieCard
              movie={item}
              layout="row"
              onSelect={handleSelect}
            />
          );

        }}

        keyExtractor={(item) => item.id}
      />

    </View>
  );
};


const Bai3 = () => {

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

      {data ? (

        <ShowData data={data} />

      ) : (

        <View>

          <ActivityIndicator size="large" />

          <Text>dang tai du lieu</Text>

        </View>

      )}

    </View>
  );
};


export default Bai3;


const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

});