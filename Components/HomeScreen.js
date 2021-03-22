import * as React from 'react';
import { Button, StyleSheet, View, Text, Image, PermissionsAndroid} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const imageBool = true;
    const count = 0;
    const listSpeech = [];
    this.state = {
      index: 0,
      topText: "Start Your Drive To Begin Learning About Your Local History",
      bottomText: "Press Here To Start Drive",
      position: 'unknown'
    };
  }

requestLocationPerms = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message:
          "Please enable location permission.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("y");
    } else {
      console.log("n");
    }
  } catch (err) {
    console.warn(err);
  }
};
getLocation(){
    this.requestLocationPerms();
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position)
        const pos = JSON.stringify(position);
        this.setState(
          {initialPosition : pos}
          );
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    }

render() {
  return (
      <View style={styles.container}>
        <Button title = "get location maybe" onPress={() => {
          this.getLocation();
          }}>
          </Button>
          <Text>Location: {this.state.initialPosition}</Text>
      <Text>Welcome to AutoNarrator!</Text>
			<Text>This is the Home Page.</Text>
    </View>
  );
}
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