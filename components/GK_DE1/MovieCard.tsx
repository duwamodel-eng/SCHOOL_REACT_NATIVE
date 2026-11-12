import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard = ({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardProps) => {

  return (
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={layout === 'row' ? styles.row : styles.tile}
    >

      <Image
        source={{ uri: movie.poster }}
        style={styles.poster}
      />

      <View style={styles.info}>

        <Text style={styles.title}>
          {movie.title}
        </Text>

        <Text>
          Thể loại: {movie.genre}
        </Text>

        <Text>
          Năm: {movie.year}
        </Text>

        <Text>
          * {movie.rating.toFixed(1)}
        </Text>

        <Text>
          {movie.isShowing
            ? 'Đang chiếu '
            : 'Ngừng chiếu '}
        </Text>

      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  row: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },

  tile: {
    padding: 10,
    marginBottom: 10,
  },

  poster: {
    width: 100,
    height: 140,
  },

  info: {
    padding: 10,
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default React.memo(MovieCard);