import * as React from "react";
import HomeScreen from "./Components/HomeScreen";
import SettingsScreen from "./Components/SettingsScreen";
import LastDriveScreen from "./Components/LastDriveScreen";
import { StyleSheet, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

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
    <View style={{ width: "100%", height: "100%" }}>
      <View style={styles.header}>
        <View style={{ height: "15%" }} />
        <Image source={require("./assets/Title.png")} style={styles.title} />
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
