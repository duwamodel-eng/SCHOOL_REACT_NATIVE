import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert, Switch, RefreshControl, TextInput, SectionList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useState, useEffect, useMemo, useCallback } from 'react'
import React from 'react';

export interface Movie{
  id : string, 
  title: string, 
  genre : string, 
  year: number, 
  rating : number, 
  poster : string, 
  isShowing : boolean
} 

interface MovieCardProps {
  movie: Movie,
  layout?: 'row' | 'tile',
  onSelect: (id: string) => void,
}

// Cau 3 + Cau 4 layout = row/tile: 


const MovieCard = ({
  movie,
  layout = 'row',
  onSelect
}:MovieCardProps) =>{
  const isTile=layout === 'tile'
  return (
    <TouchableOpacity
      onPress = {()=> onSelect(movie.id)}
      style={[
        styles.card,
        isTile && styles.TileCard
      ]}
    >

      <Image
        source = {{uri:movie.poster}}
        resizeMode ='cover'
        style={[
          styles.poster,
          isTile && styles.posterTile
        ]}
      />
      {!isTile && (
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{movie.title}</Text>
          </View>

          <View>
            <Text>{movie.genre}</Text>
          </View>

          <View>
            <Text>{movie.year}</Text>
          </View>

          <View>
            <Text>⭐{movie.rating.toFixed(1)}</Text>
          </View>

          <View>
            <Text>{movie.isShowing ? 'Dang chieu✅':"Ngung Chieu❌"}</Text>
          </View>

        </View>
      )}

      {isTile && (
        <Text style={styles.TileRating}>⭐{movie.rating.toFixed(1)}</Text>
      )}

      {isTile && (
        <View style={styles.info}>
          <View>
            <Text style={styles.title}>{movie.title}</Text>
          </View>

          <View>
            <Text>{movie.isShowing ? 'Dang chieu✅':"Ngung Chieu❌"}</Text>
          </View>

        </View>
      )}
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    alignItems: 'center',
    gap: 10
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 6,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  TileCard :{
    flexDirection: 'column',
    alignItems: 'stretch', 
    width: '47%',
    margin: '1.5%',
    padding: 0,
    flexGrow: 0,
    flexShrink: 0
  },

  posterTile:{
    width: '100%',
    aspectRatio: 2/3,
  },

  TileRating:{
    position: 'absolute',
    top: 18,
    right: 18,
    fontWeight: 'bold',
    fontSize: 20,
    zIndex: 1
  }
});

export default React.memo(MovieCard);




