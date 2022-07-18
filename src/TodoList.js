import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { useAppContext } from './Context';
import TodoItem from './TodoItem';

export default function TodoList() {
  const { appState } = useAppContext();
  const { todoList } = appState;
  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      {todoList.length > 0 && (
        <FlatList
          data={todoList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoItem todo={item} />}
        />
      )}

      {todoList.length === 0 && <Text>Todo listesi boş</Text>}
    </View>
  );
}
