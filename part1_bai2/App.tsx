import { useState } from "react";
import { Button, Text, View } from "react-native";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <View>
      <Text>{count}</Text>

      <Button
        title="Tăng"
        onPress={()=>setCount(count+1)}
      />

      <Button
        title="Giảm"
        onPress={() => {
          if (count > 0) {
            setCount(count - 1);
          }
        }}
      />
    </View>
  );
};

export default function App() {
  return (
    <View>
      <Counter />
    </View>
  );
}