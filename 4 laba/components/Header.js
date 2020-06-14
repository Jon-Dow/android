import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>Контакты</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: '#545454'
  },
  text: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 23,
    textAlign: 'left'
  }
});

export default Header
