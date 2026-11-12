import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'

const books = [
  {
    id: 1,
    name: 'Đắc Nhân Tâm',
    price: '80.000đ',
    image: require('../assets/android-icon-background.png'),
  },
  {
    id: 2,
    name: 'Nhà Giả Kim',
    price: '90.000đ',
    image: require('../assets/android-icon-background.png'),
  },
  {
    id: 3,
    name: 'Tuổi Trẻ Đáng Giá Bao Nhiêu',
    price: '100.000đ',
    image: require('../assets/android-icon-background.png'),
  },
  {
    id: 4,
    name: 'Harry Potter',
    price: '120.000đ',
    image: require('../assets/android-icon-background.png'),
  },
]

export class Week_3_4_Layout_H2_Bai2_copy extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          Book Grid
        </Text>

        <View style={styles.bookGrid}>

          {books.map((book) => (
            <View style={styles.bookCard} key={book.id}>

              <Image
                source={book.image}
                style={styles.bookImage}
              />

              <View style={styles.bookInfo}>

                <Text style={styles.bookName}>
                  {book.name}
                </Text>

                <Text style={styles.bookPrice}>
                  {book.price}
                </Text>

              </View>

            </View>
          ))}

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  bookGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  bookCard: {
    width: '48%',
    marginBottom: 20,
  },

  bookImage: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderWidth: 1,
    borderColor: 'blue',
  },

  bookInfo: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: 'green',
    paddingVertical: 6,
    alignItems: 'center',
  },

  bookName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },

  bookPrice: {
    marginTop: 4,
    color: 'red',
  },
})

export default Week_3_4_Layout_H2_Bai2_copy