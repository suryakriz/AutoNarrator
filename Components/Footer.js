import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function Footer() {
	const navigation = useNavigation();
	
	return (
		<View style={styles.container}>
			<Button
				title="Home"
				onPress={() => navigation.navigate('Home')}
			/>
			<Button
				title="Last Drive"
				onPress={() => navigation.navigate('Last Drive')}
			/>
			<Button
				title="Settings"
				onPress={() => navigation.navigate('Settings')}
			/>
		</View>
	);
}
		
		
const styles = StyleSheet.create({
  container: {
    flex: 1,
		flexDirection: 'row',
    backgroundColor: '#fff',
    position: 'absolute',
		bottom: 0
  },
});

export default Footer;
