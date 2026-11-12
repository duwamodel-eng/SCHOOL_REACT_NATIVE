import { useState } from "react";
import { Text, View } from "react-native";

interface Todo {
  id: string;
  title: string;
}

const arr: Todo[] = [
  { id: "1", title: "Học React Native" },
  { id: "2", title: "Học TypeScript" },
  { id: "3", title: "Làm bài Todo" },
];

const TodoList = ({ todos }: { todos: Todo[] }) => {
  console.log(todos)
  return (
    <View>
      {todos.map((item)=>{
        console.log(item)
        return(
          <>
            <Text>{item.id} - {item.title}</Text>
          </>
        )
      })}
    </View>
  );
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>(arr);

  return (
    <View>
      <TodoList todos={todos} />
    </View>
  );
}