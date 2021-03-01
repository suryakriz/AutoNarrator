import * as React from 'react';
import Footer from './Footer';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function SettingsScreen( { navigation } ) {
  return (
    <View style={styles.container}>
			<Text>This is the Settings Screen.</Text>
			<Footer/>
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

export default SettingsScreen;