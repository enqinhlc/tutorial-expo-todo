import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Button from './Button';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function Todo() {
  const [todoName, setTodoName] = React.useState('');
  const [todoList, setTodoList] = React.useState([]);
  const [editTodoItem, setEditTodoItem] = React.useState(null);

  const todoInputOnPress = () => {
    if (editTodoItem === null) addTodo();
    else saveEditTodo();
  };

  const saveEditTodo = () => {
    const newTodo = { ...editTodoItem, name: todoName, updatedAt: new Date() };
    const newTodoList = todoList.map((todoItem) => {
      if (todoItem.id === newTodo.id) {
        return newTodo;
      }

      return todoItem;
    });

    setTodoList(newTodoList);
    setEditTodoItem(null);
    setTodoName('');
  };

  const addTodo = () => {
    if (todoName.length > 3) {
      const newTodo = {
        id: Math.floor(new Date().getMilliseconds()), // id, zamandiliminden milisaniye düşük değere yuvarlanmış hali.
        name: todoName, // todo adı
        isDone: false, // todo tamamlandımı durumu
        createdAt: new Date(), // oluşturulduğu tarih
        updatedAt: new Date(), // güncellendiği tarih
      };

      // 1. varyant
      /*  const newTodoList = [...todoList];
    newTodoList.push(newTodo);
    setTodoList(newTodoList); */

      // 2. varyant
      setTodoList((prevTodoList) => [newTodo, ...prevTodoList]);
      setTodoName('');
    } else {
      Alert.alert('Todo Hata!', 'Minimum 3 karakter belirtebilirsiniz.');
    }
  };

  const editTodo = (todo) => {
    setTodoName(todo.name);
    setEditTodoItem(todo);
  };

  const deleteTodo = (todo) => {
    const newTodoList = todoList.filter((todoItem) => todoItem.id !== todo.id);
    setTodoList(newTodoList);
  };

  /*  const completeTodo = (todo) => {
    const newTodoList = todoList.filter((todoItem) => todoItem.id !== todo.id);
    const newTodo = {
      ...todo,
      isDone: true,
      updatedAt: new Date(),
    };

    setTodoList([...newTodoList, newTodo]);
  }; */

  const completeTodo = (todo) => {
    const newTodoList = todoList.map((todoItem) => {
      if (todoItem.id === todo.id) {
        const newTodoItem = {
          ...todoItem,
          isDone: true,
          updatedAt: new Date(),
        };

        return newTodoItem;
      }

      return todoItem;
    });

    setTodoList(newTodoList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benim Todo Listem</Text>

      {/* Todo Input */}
      <TodoInput
        todoName={todoName}
        setTodoName={setTodoName}
        todoEkle={todoInputOnPress}
      />

      {/* Todo List */}
      {todoList.length > 0 && (
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoItem
              todo={item}
              deleteTodo={() => deleteTodo(item)}
              completeTodo={() => completeTodo(item)}
              editTodo={() => editTodo(item)}
            />
          )}
        />
      )}

      {todoList.length === 0 && <Text>Todo listesi boş</Text>}
    </View>
  );
}
