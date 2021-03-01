import * as React from 'react';
import HomeScreen from './Components/HomeScreen'
import SettingsScreen from './Components/SettingsScreen'
import LastDriveScreen from './Components/LastDriveScreen'
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Settings" component={SettingsScreen} />
				<Stack.Screen name="Last Drive" component={LastDriveScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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

export default App;
