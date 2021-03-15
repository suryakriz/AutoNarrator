import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import * as Speech from "expo-speech";

async function ttsList() {
  try {
    let r1 = await Speech.getAvailableVoicesAsync();
    var returnList = [];
    for (var i = 0; i < r1.length; i++) {
      var loc = r1[i].identifier.indexOf("en");
      if (loc != -1) {
        returnList.push({
          label: r1[i].identifier,
          value: r1[i].identifier,
        });
      }
    }
    return returnList;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

function DropdownItem(label) {
  this.label = label;
}

export default class SettingsScreen extends Component {
  constructor() {
    super();
    var voiceList = [
      {
        label: "en-GB-language",
        value: "en-GB-language",
      },
    ];
    this.state = {
      rate: 1.0,
      pitch: 1.0,
      voice: "en-GB-language",
      vList: voiceList,
    };
    ttsList()
      .then((result) => {
        this.voiceList = result;
        this.setState({
          vList: this.voiceList,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  }

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
        <Text style={styles.text}>
          {this.state.pitch && +this.state.pitch.toFixed(3)}
        </Text>
        <Slider
          step={0.5}
          style={styles.slider}
          onValueChange={(pitch) => this.setState({ pitch: pitch })}
          minimumValue={0}
          maximumValue={2}
          value={this.state.pitch}
        />
        <DropDownPicker
          items={this.state.vList}
          defaultValue={this.state.voice}
          containerStyle={{ height: 40, width: "50%" }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) =>
            this.setState({
              voice: item.value,
            })
          }
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
