import React from 'react';

import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default ({ onPress, style, textStyle, title }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: 'blue',
        borderRadius: 10,
        height: 40,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={[{ fontSize: 16, color: 'white' }, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};
