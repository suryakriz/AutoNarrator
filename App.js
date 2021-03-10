import * as React from 'react';
import HomeScreen from './Components/HomeScreen'
import SettingsScreen from './Components/SettingsScreen'
import LastDriveScreen from './Components/LastDriveScreen'
import { StatusBar, StyleSheet, View, Text, SafeAreaView, Image, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HeaderTitle } from '@react-navigation/stack';
import Title from "./assets/Title.png";

const Tab = createBottomTabNavigator();

state = {
  location: null
};

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
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Past Trips"
        component={LastDriveScreen}
        options={{
          tabBarLabel: 'Past Trips',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-time-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
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

findCoordinates = () =>
{
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);

        this.setState({location});
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy : true, timeout: 20000, maximumAge: 1000}
    );
    
};
//ACTUALLY CALLING THE APP 
function App() {
  console.log(this.state.location);
  return (
    <View style= {{ width: "100%", height: "100%"}}>
      <View style= {styles.header}>
        <View style = {{height: "15%"}} />
        <Image source={require("./assets/Title.png")} style={styles.title}/>
        <Text>Location: {this.state.location}</Text>
      </View>
      <NavigationContainer>
		  	<MyTabs />
		  </NavigationContainer>
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
  header:{
    alignItems: 'center',  
    width: "100%", 
    height: "15%", 
    backgroundColor: '#529bcc',
  },
  title: {
    resizeMode: "contain",
    height: "70%",
  },
});

export default App;
