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
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Speech from "expo-speech";
import { connect, useDispatch } from "react-redux";
import { VisitedListAdd } from "../Redux/VisitedSlice";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

let customFonts = {
  "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
};

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
      location: null,
      lat: null,
      long: null,
      errormsg: "",
      inProgress: false,
      intervalFunc: null,
      intervalSet: false,
      locationList: [],
    };
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
      return false;
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const { latitude, longitude } = location.coords;
    console.log(location);
    //this.getGeocodeAsync({latitude, longitude})
    this.setState({
      location: { latitude, longitude },
      lat: latitude,
      long: longitude,
    });
    return true;
  };
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

  async loadData() {
    console.log("Running Load Data");
    if (this.state.index == 1) {
      console.log("Speaking State");
      const start = () => {
        this.setState({ inProgress: true });
      };
      const complete = () => {
        this.state.inProgress && this.setState({ inProgress: false });
      };

      var have_location = await this.getLocationAsync();
      var longitude = this.state.long;
      var latitude = this.state.lat;
      //var longitude = -96;
      //var latitude = 30;

      if (have_location) {
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
        var count = 0;

        while (count < listOfLocations.length) {
          if (!this.state.inProgress) {
            console.log("Not Speaking");
            var location = listOfLocations.eq(count);
            var locationUrl = "https://www.hmdb.org/" + location.attr("href"); //website of the

            if (
              this.state.locationList.includes(location.attr("href")) == false
            ) {
              console.log("Not Visited Location");
              response = await fetch(locationUrl);
              htmlString = await response.text();
              this.setState((state) => {
                const locationList = state.locationList.concat(
                  location.attr("href")
                );

                return {
                  locationList,
                  value: "",
                };
              });
              var landmarkInfo = cheerio
                .load(htmlString)("#inscription1")
                .text();
              this.props.dispatch(VisitedListAdd(landmarkInfo));
              Speech.speak(landmarkInfo, {
                voice: this.props.voice,
                rate: this.props.speed,
                onStart: start,
                onDone: complete,
              });
              return;
            } else {
              console.log("Visited Location");
              count = count + 1;
            }
          } else {
            console.log("Currently Speaking");
            return;
          }
        }
      }
    } else {
      console.log("Stop Speaking");
      Speech.stop();
      this.setState({ inProgress: false });
      return;
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
    if (this.state.intervalSet == false) {
      console.log("Interval func not set therefor setting");
      this.state.intervalSet = true;
      this.state.intervalFunc = setInterval(() => {
        console.log("interval");
        if (this.state.index == 0) {
          console.log("Exiting Interval");
          return;
        } else {
          this.loadData();
        }
      }, 10000);
    } else {
      this.state.intervalSet = false;
      console.log("clearInterval");
      clearInterval(this.state.intervalFunc);
      this.state.intervalFunc = null;
      console.log("Should be clearing speak");
      Speech.stop();
      this.setState({ inProgress: false });
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
    timeBetween: state.settings.timeBetween,
  };
}

export default connect(mapStateToProps)(HomeScreen);

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
    fontFamily: "Quicksand-Regular",
  },
  HomeTextBot: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Quicksand-Regular",
  },
});

function Home() {
  const dispatch = useDispatch();
  return <HomeScreen dispatch={dispatch} />;
}
