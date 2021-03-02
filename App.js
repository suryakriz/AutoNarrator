import * as React from 'react';
//import HomeScreen from './Components/HomeScreen'
//import SettingsScreen from './Components/SettingsScreen'
//import LastDriveScreen from './Components/LastDriveScreen'
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

//THIS IS WHERE HOMEPAGE STUFF GOES
function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

//THIS IS WHERE PAST TRIPS STUFF GOES
function PastTrips() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>PastTrips!</Text>
    </View>
  );
}

//THIS IS WHERE SETTINGS STUFF GOES
function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

//BOTTOM TAB STUFF
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        inactiveTintColor: '#ffffff',
        activeBackgroundColor: '#214988',
        inactiveBackgroundColor: '#529bcc',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Past Trips"
        component={PastTrips}
        options={{
          tabBarLabel: 'Past Trips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}


//ACTUALLY CALLING THE APP 
function App() {
  return (
    <NavigationContainer>
			<MyTabs />
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
