import { useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";

interface Iprop{
  isLoading: boolean,
  chidlren: React.ReactNode  
}

const LoadingContainer = ({isLoading,chidlren}:Iprop) =>{
  return(
    <>
      {isLoading?(<ActivityIndicator/>):(chidlren)}
    </>
  )
}

export default function App() {
  return (
    <View>
      <LoadingContainer isLoading={false} chidlren={<>abc</>}/> 
    </View>
  );
}