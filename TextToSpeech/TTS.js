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
      pic: require("../assets/PlayButton.png"),
      index: 0,
    };
  }

  speak() {
    //if displaying play button then once it is pressed start speaking
    if (this.state.index == 0) {
      //const thingToSay =
      //  "Washington-on-the-Brazos. . This village ,  site of the signing of the Texas Declaration of Independence and first capital of the Republic of Texas ,  began in 1822 as a ferry crossing. Here the historic La Bahia Road (now Ferry Street) spanned the Brazos River..   In 1834 a townsite was laid out and named, probably for Washington, Georgia, home of a leading settler..   In 1835, as political differences with Mexico led toward war, the General Council (the insurgent Texas government) met in the town. Enterprising citizens then promoted the place as a site for the Convention of 1836 and, as a 'bonus,' provided a free meeting hall. Thus, Texas' Declaration of Independence came to be signed in an unfinished building owned by a gunsmith..   The Provisional Government of the Republic was also organized in Washington, but was removed, March 17, as news of the advancing Mexican Army caused a general panic throughout the region. The townspeople fled too on March 20, 1836, in the 'Runaway Scrape'..   After the Texan victory at San Jacinto, the town thrived for a period. It was again capital of Texas, 1842-1845; and became center of Washington State Park, 1916. It now contains historic buildings and 'Barrington', home of Anson Jones, the last President of Texas. (1969)";
      var thingToSay = "Today, we will be testing voice:";
      var listSpeech = [];
      ttsList()
        .then((result) => {
          //Print List of English Voices
          console.log(result);
          listSpeech = result;
          //Speak sample text in all of the various voices
          console.log(listSpeech);
          for (var i = 0; i < listSpeech.length; i++) {
            //uncomment to start speaking sample text in all of the languages
            //console.log(listSpeech[i]);
            thingToSay = "Today, we will be testing voice: " + listSpeech[i];
            Speech.speak(thingToSay, { voice: listSpeech[i] });
          }
        })
        .catch((err) => {
          console.log("error");
        });
    } else {
      Speech.stop();
    }
  }

  Load_New_Image = () => {
    if (this.imageBool) {
      this.imageBool = false;
      this.setState({
        pic: require("../assets/PlayButton.png"),
        index: 0,
      });
    } else {
      this.imageBool = true;
      this.setState({
        pic: require("../assets/StopButton.png"),
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
          style={styles.buttonContainer}
        >
          <Image source={this.state.pic} style={styles.image} />
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
  buttonContainer: {
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
});
