import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";

export default class SettingsScreen extends Component {
  constructor() {
    super();
    var voice = "";
    this.state = {
      rate: 1.0,
      pitch: 1.0,
    };
  }
  static defaultProps = {};

  render() {
    return (
      <View style={styles.container}>
        <Text>This is the Settings Screen.</Text>
        <Text style={styles.text}>
          {this.state.rate && +this.state.rate.toFixed(3)}
        </Text>
        <Slider
          step={0.5}
          style={styles.slider}
          onValueChange={(rate) => this.setState({ rate: rate })}
          minimumValue={0}
          maximumValue={2}
          value={this.state.rate}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 50,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    margin: 10,
  },
});
