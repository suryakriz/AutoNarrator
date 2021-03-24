import * as React from 'react';
import HomeScreen from './Components/HomeScreen'
import SettingsScreen from './Components/SettingsScreen'
import LastDriveScreen from './Components/LastDriveScreen'
import {Button, StatusBar, StyleSheet, View, Text, Image, Alert, TouchableOpacity, PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import store from './Redux/Store'
import { Provider } from 'react-redux';
import Title from "./assets/Title.png";

//import { HeaderTitle } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
navigator.geolocation = require('@react-native-community/geolocation');

//BOTTOM TAB STUFF
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "#ffffff",
        inactiveTintColor: "#ffffff",
        activeBackgroundColor: "#214988",
        inactiveBackgroundColor: "#529bcc",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Past Trips"
        component={LastDriveScreen}
        options={{
          tabBarLabel: "Past Trips",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: "Settings",
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
    <Provider store={store}>
      <View style={{ width: "100%", height: "100%" }}>
        <View style={styles.header}>
          <View style={{ height: "15%" }} />
          <Image source={require("./assets/Title.png")} style={styles.title} />
        </View>
        <NavigationContainer>
          <MyTabs />
        </NavigationContainer>
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    width: "100%",
    height: "15%",
    backgroundColor: "#529bcc",
  },
  title: {
    resizeMode: "contain",
    height: "70%",
  },
});

export default App;
