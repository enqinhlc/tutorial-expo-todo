import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppProvider } from './src/Context';
import Todo from './src/Todo';
import TodoList from './src/TodoList';

export default function App() {
  return (
    <AppProvider>
      <Todo />
      <TodoList />
    </AppProvider>
  );
}
