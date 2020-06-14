import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

export const IntroScreen = ({navigation}) => {

  const goToGame = () => {
      navigation.navigate('Game')
  };

  return (
      <View style={styles.container}>
          <Text style={styles.text}>Игра в кости</Text>
          <TouchableOpacity
              style={styles.goButton}
              onPress={goToGame}
          >
              <Text style={styles.goButtonText}>Начать новую игру</Text>
          </TouchableOpacity>
      </View>
  )
};

IntroScreen.navigationOptions = {
    headerTitle: 'Поиграем?'
};

const styles = StyleSheet.create({
   container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: '#f0f0f0',

   },
   text: {
       color: '#24f46f',
       fontSize: 34
   },
   goButton: {
       backgroundColor: '#515151',
       padding: 10,
       width: '50%',
       marginTop: 30
   },
   goButtonText: {
       color: '#24f46f',
       textAlign: 'center'
   },
   postText: {  
       color: '#a9a9a9',
   }
});