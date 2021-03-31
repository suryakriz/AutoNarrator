import * as React from "react";
import {
  Image,
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Speech from "expo-speech";
import { connect, useDispatch } from "react-redux";
import { VisitedListAdd } from "../Redux/VisitedSlice";
import { PastTripsAdd, AddLandmarkToTrip } from "../Redux/PastTripsSlice";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Icon from 'react-native-ico-miscellaneous';
import Icon2 from 'react-native-ico-basic';
import { mdiOrnament } from "@mdi/js";
import moment from 'moment';

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
      locationList: props.visited,
      isVisible: false,
      date: "",
      starttime: "",
      starttime2: null,
      endtime:"",
      endtime2: null,
      length: null,
    };
  }

  displayModal(show){
    this.setState({isVisible: show})
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
            var locationName = location.text();
            var locationUrl = "https://www.hmdb.org/" + location.attr("href"); //website of the

            if (this.state.locationList.includes(locationName) == false) {
              console.log("Not Visited Location");
              response = await fetch(locationUrl);
              htmlString = await response.text();
              this.setState((state) => {
                const locationList = state.locationList.concat(locationName);

                return {
                  locationList,
                  value: "",
                };
              });
              var landmarkInfo = cheerio
                .load(htmlString)("#inscription1")
                .text();
              this.props.dispatch(VisitedListAdd(locationName));
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
    console.log("Current Index: " + this.state.index)
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
      this.setState({
        date: moment().format('MM/DD/YYYY'),
        starttime: moment().format('hh:mm a'),
        starttime2: Date.now(),
      })
      console.log("Interval func not set therefore setting");
      this.state.intervalSet = true;
      this.state.intervalFunc = setInterval(() => {
        console.log("interval: ", this.props.timeBetween);
        if (this.state.index == 0) {
          console.log("Exiting Interval");
          return;
        } else {
          this.loadData();
        }
      }, this.props.timeBetween);
    } else {
      this.state.intervalSet = false;
      console.log("clearInterval");
      clearInterval(this.state.intervalFunc);
      this.state.intervalFunc = null;
      console.log("Should be clearing speak");
      Speech.stop();
      this.setState({ inProgress: false });
    }
    console.log("New Index: " + this.state.index)
    if (this.state.index == 1){
      this.setState({
        endtime: moment().format('hh:mm a'),
      })
      var duration = Date.now() - this.state.starttime2;

      var minutes = Math.floor((duration / (1000 * 60)) % 60);
      var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      this.setState({
        length: hours + " hours and " + minutes + " minutes",
      })
      this.displayModal(true);
    }
  };

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Modal
            animationType = {"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>
              <View style={{height: "95%"}}>
                <Text style = { styles.panelHeader }> After Drive Summary! </Text>
                <ScrollView style={styles.scroll}>
                  <View style={styles.header}>
                    <Icon color="#ffffff" height={20} name="car" />
                    <Text style={{ marginLeft:"3%" , color: "#ffffff", fontFamily: "Quicksand-Regular"}}> Drive Information </Text>
                  </View>
                  <Text style={styles.paneltext}>{'\u2022 Date: '} {this.state.date}</Text>
                  <Text style={styles.paneltext}>{'\u2022 Start Time: '} {this.state.starttime}</Text>
                  <Text style={styles.paneltext}>{'\u2022 End Time: '} {this.state.endtime}</Text>
                  <Text style={styles.paneltext}>{'\u2022 Trip Length: '} {this.state.length}</Text>
                  <View style={styles.header}>
                    <Icon2 color="#ffffff" height={20} name="achievement" />
                    <Text style={{ marginLeft:"3%" , color: "#ffffff", fontFamily: "Quicksand-Regular"}}> Landmark Report </Text>
                  </View>
                </ScrollView>
                <View style={styles.button}>
                  <AwesomeButtonBlue
                    progress
                    type="primary"
                    height={40}
                    onPress={() => {
                      this.displayModal(!this.state.isVisible);}}
                  > 
                    <Text style = { styles.textButton }>Close Panel</Text>
                  </AwesomeButtonBlue>
                </View>
              </View>
          </Modal>
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
    visited: state.visited,
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
  panelHeader: {
    fontSize: 32,
    fontFamily: "Quicksand-Regular",
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  paneltext: {
    fontSize: 18,
    fontFamily: "Quicksand-Regular",
    marginLeft: 20,
    marginTop: 5,
  },
  textButton: {
    fontSize: 18,
    fontFamily: "Quicksand-Regular",
    color: "#fff",
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
    fontFamily: "Quicksand-Regular",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    height: "70%",
    width: "100%",
  },
  header: {
    backgroundColor: "#214988",
    fontWeight: "bold",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
  },
});
