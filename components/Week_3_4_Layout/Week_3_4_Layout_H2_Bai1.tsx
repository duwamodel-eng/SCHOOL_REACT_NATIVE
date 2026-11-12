import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'

export class Week_3_4_Layout_H2_Bai1 extends Component {

  categories = [
    'Văn học',
    'Kinh tế',
    'Thiếu nhi',
    'Kỹ năng sống',
    'Truyện tranh',
    'Công nghệ',
    'Lịch sử',
    'Tâm lý',
    'Khoa học',
    'Ngoại ngữ',
  ]

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Danh mục sách </Text>
        <View style={styles.containerChips}>
          {this.categories.map((item) => (
            <View style={styles.chip}>
              <Text style={styles.Textchip}>{item}</Text>
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
    paddingTop: 40,
    paddingLeft: 20
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    paddingTop: 20,
    alignContent: 'flex-start'
  },
  containerChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 20
  },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderColor: 'indigo',
    borderWidth: 1,
    borderRadius: 50,
    marginBottom: 5
  },
  Textchip: {
    color: 'indigo',
    fontSize: 22
  }
})

export default Week_3_4_Layout_H2_Bai1
