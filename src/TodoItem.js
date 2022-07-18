import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import { useAppContext } from './Context';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingBottom: 10,
  },
  name: {
    color: 'red',
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
    fontSize: 14,
    color: '#111111',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default function TodoItem({ todo }) {
  const { editTodo, completeTodo, deleteTodo } = useAppContext();
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.text, styles.name]}>{todo.name}</Text>
        <Text style={styles.text}>
          {todo.isDone ? 'Tamam' : 'Devam Ediyor'}
        </Text>
      </View>
      <Text style={styles.text}>
        Oluşturulduğu Tarih: {todo.createdAt.toLocaleString()}
      </Text>
      <Text style={styles.text}>
        Güncellendiği Tarih Tarih: {todo.updatedAt.toLocaleString()}
      </Text>

      <View style={styles.row}>
        <Button title="Düzenle" onPress={() => editTodo(todo)} />
        <Button title="Sil" onPress={() => deleteTodo(todo)} />
        <Button title="Tamamla" onPress={() => completeTodo(todo)} />
      </View>
    </View>
  );
}
