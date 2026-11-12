import { StyleSheet, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image, Alert, Switch, RefreshControl, TextInput, SectionList } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {useState, useEffect, useMemo, useCallback } from 'react'
import React from 'react';

import MovieCard, {Movie} from './components/MovieCard'


const url = 'https://6ad37dd959dd78397bbbc62b.mockapi.io/movies'


export default function App() {

  const [data, setdata] = useState<Movie[]>([]);
  const [loading, setloading] = useState(true)
  

  // useEffect(()=>{
  //   fetch(url)
  //     .then((res)=>{
  //       return res.json()
  //     })
  //     .then((data)=>{
  //       setdata(data as IMovie[])
  //       setloading(false)
  //     })
  //     .catch((error)=>{
  //       console.log(error)
  //       setloading(false);
  //     })
  // },[])

  const handleSelect = (id: string) =>{
    const movie = data.find((item)=> item.id === id )
    if(movie){
      // Alert.alert(movie.title)
      console.log(movie.title)
    }
  }


// Duoi cau 5 

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>

//         <View style={styles.header}>
//         <Text style={styles.title}>Movie App</Text>
//         </View>

//         {loading ? (
//           <ActivityIndicator 
//             style={styles.loading}
//           />
//         ) : (
//         <FlatList
//           data={data}

//           // renderItem = {({item}:{item:IMovie})=>{
//           //   return(
//               // <View style={styles.movieItem}>
//               //   <Text style={styles.movieTitle}>{item.title}</Text>
//               //   <Text style={styles.movieRating}>{item.rating}</Text>
//               //   <Text style={styles.movieStatus}>{item.isShowing? 'Dang Chieu' : 'Ngung Chieu'}</Text>
//           //     </View>
//           //   )
//           // }}

//           renderItem={({item}: {item:Movie})=>{
//             return (
//               <MovieCard 
//                 movie={item}
//                 layout='tile'
//                 onSelect={(id)=>{
//                   handleSelect(id)
//                 }} 
//             />
//             )
//           }}
//           keyExtractor = {item => item.id}
//         />
//         )}

//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }


// Mo rong: Loc phim ngung chieu
  const [isStoppedOnly, setIsStoppedOnly] = useState(false)


// Mo rong:  Tim kiem theo ten phim
  const [searchText, setSearchText] = useState('');

// Cau 6: 

  const [refreshing, setRefreshing] = useState(false);

  const loadMovies = (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setloading(true);
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Lỗi tải danh sách phim');
        }
        return res.json();
      })
      .then((data) => {
        setdata(data as Movie[]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setloading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    loadMovies();
  }, []);


// Mo rong: Dung useMemo de loc danh sach ngung chieu 
  const filteredMovies = useMemo(() => {
    if (isStoppedOnly) {
      return data.filter((movie) => movie.isShowing === false);
    }
    return data;
  }, [data, isStoppedOnly]);


// tìm kiếm theo tên phim: 
  const searchedMovies = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    // return data.filter((movie) =>
    return filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(keyword)
    );
  // }, [data, searchText]);
  }, [filteredMovies, searchText]);

// Cau 5 :

// Chuyen doi 1 cot / 2 cot
  const [isTile, setIstile] = useState(false)
  const numColunms= isTile ? 2 : 1 

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Movie App</Text>

          <View style={styles.switchContainer}>
            <View style={styles.switchRow}>
              <Text>Dạng lưới</Text>
              <Switch
                value={isTile}
                onValueChange={setIstile}
              />
            </View>

            <View style={styles.switchRow}>
              <Text>Ngừng chiếu</Text>
              <Switch
                value={isStoppedOnly}
                onValueChange={setIsStoppedOnly}
              />
            </View>
          </View>
        </View>

        <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm theo tên phim..."
            value={searchText}
            onChangeText={setSearchText}
        />

        {loading ? (
          <ActivityIndicator 
            style={styles.loading}
          />
        ) : (
        <FlatList
          key={String(numColunms)} 
          // data={data}
          // data={filteredMovies}
          data={searchedMovies}
          renderItem={({item}: {item:Movie})=>{
            return (
              <MovieCard 
                movie={item}
                layout={isTile ? 'tile' : 'row'}
                // layout='tile'
                
                onSelect={(id)=>{
                  handleSelect(id)
                }} 
              />
            )
          }}
          keyExtractor = {item => item.id}
          numColumns={numColunms}
          columnWrapperStyle={
            isTile ? styles.colWrapper : undefined
          }
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadMovies(true)}
            />
          }  
          ListEmptyComponent={
            <Text style={styles.empty}>
              Không tìm thấy phim phù hợp
            </Text>
          } 
        />
        )}

      </SafeAreaView>
    </SafeAreaProvider>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20
  },
  loading:{
    marginTop: 30
  },
  colWrapper:{
    justifyContent: 'space-between'
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});