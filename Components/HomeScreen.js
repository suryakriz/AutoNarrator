import * as React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen( { navigation } ) {
  return (
      <View style={styles.container}>
      <Text>Welcome to AutoNarrator!</Text>
			<Text>This is the Home Page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;