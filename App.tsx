import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

// import Week_3_4_Layout_Bai1 from './components/Week_3_4_Layout_H1_Bai1'
// import Week_3_4_Layout_Bai2 from './components/Week_3_4_Layout__H1_Bai2'
// import Week_3_4_Layout_H2_Bai1 from './components/Week_3_4_Layout_H2_Bai1'
// import Week_3_4_Layout_H2_Bai2 from './components/Week_3_4_Layout_H2_Bai2'
// import Week_3_4_Layout_H2_Bai2_copy from './components/Week_3_4_Layout_H2_Bai2_copy'

import Bai1 from './components/bai1'
import Bai2 from './components/bai2'
import Bai3 from './components/bai3'


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Bai3 />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
