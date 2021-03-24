import * as React from "react";
import {
  Image,
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

import { connect, useDispatch } from "react-redux";
import { VisitedListAdd } from '../Redux/VisitedSlice'
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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    const imageBool = true;
    const count = 0;
    const listSpeech = [];
    this.state = {
      pic: require("../assets/PlayButton.png"),
      index: 0,
      topText: "Start Your Drive To Begin Learning About Your Local History",
      bottomText: "Press Here To Start Drive",
    };
  }

  async loadWebData() {
	//notVisited
	var notVisited = true;
	//put together the longitude and latitude of a current location
	var longitude = "-96.334643";
	var latitude = "30.592205";
	//pull the list of locations from the longitude and latitiude
	const cheerio = require("cheerio");
	const searchUrl =
	  "https://www.hmdb.org/nearbylist.asp?nearby=yes&Latitude=" +
	  latitude +
	  "&Longitude=" +
	  longitude +
	  "&submit=Show+List";
	var response = await fetch(searchUrl);
	var htmlString = await response.text();
	const listOfLocations = cheerio.load(htmlString)("a:even", "li");
	for (var i = 0; i < listOfLocations.length; i++) {
	  console.log(listOfLocations.eq(i).text()); // logs individual sections
	  if (notVisited) {
		const locationUrl =
		  "https://www.hmdb.org/" + listOfLocations.eq(i).attr("href"); //website of the
		response = await fetch(locationUrl);
		htmlString = await response.text();
		//INFORMATION TO BE READ BY THE READER
		var landmarkInfo = cheerio.load(htmlString)("#inscription1").text();
		this.props.dispatch(VisitedListAdd(landmarkInfo));
		return landmarkInfo;
	  }
	}
  }

  speak() {
    if (this.state.index == 0) {
      var thingToSay = "Today, we will be testing voice:";
      Speech.speak(thingToSay, { voice: this.props.voice, rate: this.props.speed });
      /*ttsList()
        .then((result) => {
          console.log(result);
          listSpeech = result;
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
        });*/
		this.loadWebData();
    } else {
      Speech.stop();
    }
  }

  OnButtonPress = () => {
    if (this.imageBool) {
      this.imageBool = false;
      this.setState({
        pic: require("../assets/PlayButton.png"),
        index: 0,
        topText: "Start Your Drive To Begin Learning About Your Local History",
        bottomText: "Press Here To Start Drive",
      });
    } else {
      this.imageBool = true;
      this.setState({
        pic: require("../assets/StopButton.png"),
        index: 1,
        topText:
          "Drive Has Started You Can Close Your App And Audio Will Automatically Begin",
        bottomText: "Press Here To Stop Drive",
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.HomeTextTop}>{this.state.topText}</Text>
        </View>
        <View>
          <Text style={styles.HomeTextBot}>{this.state.bottomText}</Text>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.speak();
              this.OnButtonPress();
            }}
            style={styles.buttonContainer}
          >
            <Image source={this.state.pic} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
	return {
	  voice: state.settings.voiceName,
	  speed: state.settings.talkSpeed,
	  timeBetween: state.settings.timeBetween
	}
}
  
export default connect(mapStateToProps)(HomeScreen)

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
  HomeTextTop: {
    fontSize: 24,
    paddingBottom: "10%",
    paddingTop: "10%",
    textAlign: "center",
  },
  HomeTextBot: {
    fontSize: 24,
    textAlign: "center",
  },
});
