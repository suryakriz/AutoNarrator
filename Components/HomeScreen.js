import * as React from "react";
import { Image, View, StyleSheet, Button, FlatList, Text, TouchableOpacity, PermissionsAndroid } from "react-native";
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Speech from "expo-speech";
import { connect, useDispatch } from "react-redux";
import { VisitedListAdd } from '../Redux/VisitedSlice'

let customFonts = {
  'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
};

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

  //FONT STUFF
  state = {
    fontsLoaded: false,
  };
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this._loadFontsAsync();
  }

  //LOCATION INFORMATION
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


  async loadWebData() {
    if (this.state.index == 0) {
      //notVisited
      var notVisited = true;
      //put together the longitude and latitude of a current location
      this.getLocation();
      console.log(this.state.initialPosition)
      
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
          var location = listOfLocations.eq(i)
          var locationUrl =
            "https://www.hmdb.org/" + listOfLocations.eq(i).attr("href"); //website of the
          response = await fetch(locationUrl);
          htmlString = await response.text();
          //INFORMATION TO BE READ BY THE READER
          var landmarkInfo = cheerio.load(htmlString)("#inscription1").text();
          this.props.dispatch(VisitedListAdd(landmarkInfo));
          Speech.speak(landmarkInfo, { voice: this.props.voice, rate: this.props.speed });
          return landmarkInfo;
        }
      }
    } else {
      Speech.stop();
    } 
  }

  //SWITCHING BUTTONS
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
    if (this.state.fontsLoaded) {
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
                this.loadWebData();
                this.OnButtonPress();
              }}
              style={styles.buttonContainer}
            >
              <Image source={this.state.pic} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return <AppLoading />;
    }
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
    paddingLeft: "10%",
    paddingRight: "10%",
    textAlign: "center",
    fontFamily: 'Quicksand-Regular'
  },
  HomeTextBot: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: 'Quicksand-Regular'
  },
});

function Home() {
	const dispatch = useDispatch();
	return (
		<HomeScreen dispatch={dispatch}/>
	)
}
