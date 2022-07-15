import React from 'react';
import { Text, StyleSheet, TextInput, View } from 'react-native';
import Button from './Button';

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyCotent: 'space-between',
    height: 80,
  },
  input: {
    borderWidth: 1,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
    borderColor: '#a9a9a9',
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default function TodoInput({ todoName, setTodoName, todoEkle }) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        value={todoName}
        style={styles.input}
        onChangeText={(inputValue) => {
          setTodoName(inputValue);
        }}
      />
      <Button onPress={todoEkle} title="+" />
    </View>
  );
}
