import React, { Component } from "react";
import { Image } from "react-native";
import {
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import * as Speech from "expo-speech";

async function ttsList() {
  try {
    let r1 = await Speech.getAvailableVoicesAsync();
    var returnList = [];
    for (var i = 0; i < r1.length; i++) {
      var loc = r1[i].identifier.indexOf("en");
      if (loc != -1) {
        returnList.push(r1[i].identifier);
      }
    }
    return returnList;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export default class TTS extends Component {
  constructor() {
    super();
    const imageBool = true;
    const count = 0;
    this.state = {
      pic: require("../assets/play_button.png"),
      index: 0,
    };
  }

  speak() {
    //if displaying play button then once it is pressed start speaking
    if (this.state.index == 0) {
      const thingToSay = "Welcome, to today's text to speech demo";
      Speech.speak(thingToSay, { voice: "en-GB-language" });
      var listSpeech = [];
      ttsList()
        .then((result) => {
          //Print List of English Voices
          console.log(result);
          listSpeech = result;
          //Speak sample text in all of the various voices
          for (var i = 0; i < listSpeech.length; i++) {
            //uncomment to start speaking sample text in all of the languages
            //Speech.speak(thingToSay, {voice: listSpeech[i]});
          }
        })
        .catch((err) => {
          console.log("error");
        });
    }
  }

  Load_New_Image = () => {
    if (this.imageBool) {
      this.imageBool = false;
      this.setState({
        pic: require("../assets/play_button.png"),
        index: 0,
      });
    } else {
      this.imageBool = true;
      this.setState({
        pic: require("../assets/pause_button.jpg"),
        index: 1,
      });
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.speak();
            this.Load_New_Image();
          }}
        >
          <Image source={this.state.pic} style={styles.button} />
        </TouchableOpacity>
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
  button: {
    backgroundColor: "red",
    borderRadius: 100,
    padding: 100,
  },
});
