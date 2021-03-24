import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function LastDriveScreen({ navigation }) {
  return (
    // <div className="rectangle" />

    <View style={styles.container}>
      {/* <Text>This is the Last Drive.</Text> */}
      {/* //<div className="rectangle" /> */}
      <View style={styles.rectangleOne}>
        <Text>
          Zachary{"\n"}
          {"\n"}Time Visited: 3/20/2021
        </Text>
        <Button title="Speak" />
      </View>
      <View style={styles.rectangleTwo}>
        <Text>
          Sbisa{"\n"}
          {"\n"}Time Visited: 3/20/2021
        </Text>
        <Button title="Speak" />
      </View>
      <View style={styles.rectangleThree}>
        <Text>
          Academic Building{"\n"}
          {"\n"}Time Visited: 3/20/2021
        </Text>
        <Button title="Speak" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  rectangleOne: {
    width: 300,
    height: 100,
    backgroundColor: "#f50057",
    position: "relative",
    bottom: 100
  },

  rectangleTwo: {
    width: 300,
    height: 100,
    backgroundColor: "#f50057",
    position: "relative"
  },

  rectangleThree: {
    width: 300,
    height: 100,
    backgroundColor: "#f50057",
    position: "relative",
    top: 100
  }
});

export default LastDriveScreen;
