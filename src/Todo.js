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
import { useAppContext } from './Context';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 50,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function Todo() {
  const { appState } = useAppContext();
  const { todoList } = appState;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Benim Todo Listem</Text>
      <TodoInput />
    </View>
  );
}
