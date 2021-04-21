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
  Alert,
} from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import * as Speech from "expo-speech";
import { connect, useDispatch } from "react-redux";
import { VisitedListAdd } from "../Redux/VisitedSlice";
import { PastTripsAdd, AddLandmarkToTrip } from "../Redux/PastTripsSlice";
import Landmark from "./Landmark";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";
import Icon from "react-native-ico-miscellaneous";
import Icon2 from "react-native-ico-basic";
import moment from "moment";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";

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
      locationList2: [],
      visitedList: props.visited,
      isVisible: false,
      date: "",
      starttime: "",
      starttime2: null,
      endtime: "",
      endtime2: null,
      length: null,
      reading: false,
      criticalSectionAvailable: true,
      msgtosend: "",
      msglist: [],
    };
  }

  //POP UP STATE
  displayModal(show) {
    this.setState({ isVisible: show });
  }

  //sms and email -----
  async sendSMSMsg(recips, msg) {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      var msgHeader =
        "Howdy! Here is a list of places I visited using the Auto Narrator app: \n";
      SMS.sendSMSAsync(recips, msgHeader + msg);
    } else {
      alert("sending SMS msg failed");
    }
  }
  async sendEmailMsg(arg) {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      MailComposer.composeAsync({
        recipients: [arg.recipients],
        ccRecipients: [],
        bccRecipients: [],
        subject: arg.subject,
        body: arg.body,
        isHtml: false,
        attachments: [],
      }).catch((e) => {
        console.log(e);
      });
    } else {
      alert("sending email failed");
    }
  }
  //LOCATION STUFF
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

  //LOAD DATA AND SPEAK
  async loadData() {
    //
    if (this.state.criticalSectionAvailable == true) {
      this.state.criticalSectionAvailable = false;
      if (this.state.index == 1) {
        const start = () => {
          this.setState({ inProgress: true });
        };
        const complete = () => {
          this.state.inProgress && this.setState({ inProgress: false });
        };
        var have_location = await this.getLocationAsync();
        var longitude = this.state.long;
        var latitude = this.state.lat;

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
              var location = listOfLocations.eq(count);
              var locationName = location.text();
              var locationUrl = "https://www.hmdb.org/" + location.attr("href");

              if (
                this.state.visitedList.filter(
                  (item) => item.landmarkName == locationName
                ).length == 0
              ) {
                response = await fetch(locationUrl);
                htmlString = await response.text();
                var landmarkInfo = cheerio
                  .load(htmlString)("#inscription1")
                  .text();
                let curLength = this.state.locationList.length;
                this.setState((state) => {
                  const locationList = state.locationList.concat({
                    landmarkName: locationName,
                    landmarkDescription: landmarkInfo,
                    landmarkNumber: curLength + "",
                  });
                  const locationList2 = state.locationList2.concat({
                    landmarkName: locationName,
                    landmarkDescription: landmarkInfo,
                    landmarkNumber: curLength + "",
                  });

                  return {
                    locationList,
                    locationList2,
                    value: "",
                  };
                });
                const msglist = this.state.msglist.concat({
                  name: locationName,
                  url: locationUrl,
                });
                this.setState((state) => {
                  const visitedList = state.visitedList.concat({
                    landmarkName: locationName,
                  });

                  return {
                    visitedList,
                    msglist,
                    value: "",
                  };
                });
                this.props.dispatch(VisitedListAdd(locationName));
                if (landmarkInfo.length >= 4000) {
                  landmarkInfo = landmarkInfo.substr(0, 3999);
                }
                Speech.speak(landmarkInfo, {
                  voice: this.props.voice,
                  rate: this.props.speed,
                  onStart: start,
                  onDone: complete,
                });
                this.state.criticalSectionAvailable = true;
                return;
              } else {
                count = count + 1;
              }
            } else {
              this.state.criticalSectionAvailable = true;
              return;
            }
          }
        }
      } else {
        Speech.stop();
        this.setState({ inProgress: false });
        this.state.criticalSectionAvailable = true;
        return;
      }
    } else {
      console.log("Critical Section Not Available");
    }
    return;
  }

  //START TIMER
  startTimer() {
    this.setState({
      date: moment().format("MM/DD/YYYY"),
      starttime: moment().format("hh:mm a"),
      starttime2: Date.now(),
    });
  }

  //STOP TIMER
  stopTimer() {
    console.log(this.state.locationList);
    console.log(this.state.locationList2);
    this.setState({
      endtime: moment().format("hh:mm a"),
    });
    var duration = Date.now() - this.state.starttime2;

    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const timeStr = hours + " hours and " + minutes + " minutes";
    this.state.length = timeStr;
    console.log(timeStr);
    this.setState({
      length: timeStr,
    });
  }

  //REDUX CONNECTION
  dispatchTripDetails() {
    let curTripID = this.props.pastTrips.length;
    let curTrip = {
      tripdate: this.state.date,
      triplength: this.state.length,
      starttime: this.state.starttime,
      endtime: this.state.endtime,
      numlandmarks: this.state.locationList.length,
      landmarks: this.state.locationList,
      id: curTripID + "",
    };
    this.props.dispatch(PastTripsAdd(curTrip));
    this.setState({
      locationList: [],
    });
    //console.log(locationList)
    // console.log(locationList2)
  }

  clearLocationList() {
    this.setState({
      locationList2: [],
    });
  }

  //LAST DRIVE LANDMARK LIST
  renderItem = ({ item }) => (
    <Landmark
      landmarkName={item.landmarkName}
      landmarkDescription={item.landmarkDescription}
    />
  );

  //SWITCHING BUTTONS
  OnButtonPress = () => {
    console.log("Current Index: " + this.state.index);
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
      this.startTimer();
      activateKeepAwake();
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
      deactivateKeepAwake();
      Speech.stop();

      var locationsForMsg = "";
      for (var i = 0; i < this.state.msglist.length; i++) {
        var name = this.state.msglist[i].name;
        var url = this.state.msglist[i].url;
        locationsForMsg += name + " \n" + "Link: " + url + " \n";
      }

      this.setState({ msgtosend: locationsForMsg });
      console.log(locationsForMsg);
      this.setState({ inProgress: false, criticalSectionAvailable: true });
      this.stopTimer();
      this.dispatchTripDetails();
      this.displayModal(true);
    }
    console.log("New Index: " + this.state.index);
  };

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Landmark
        landmarkName={item.landmarkName}
        landmarkDescription={item.landmarkDescription}
      />
    </View>
    /* <View>
      <Text>{item.landmarkName}</Text>
      <Text>{item.landmarkDescription}</Text>
    </View> */
  );

  //WHAT IS ON THE SCREEN
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert("Modal has now been closed.");
            }}
          >
            <View style={{ height: "98%" }}>
              <Text style={styles.panelHeader}> After Drive Summary! </Text>
              <View style={styles.header}>
                <Icon color="#ffffff" height={20} name="car" />
                <Text
                  style={{
                    marginLeft: "3%",
                    color: "#ffffff",
                    fontFamily: "Quicksand-Regular",
                  }}
                >
                  {" "}
                  Drive Information{" "}
                </Text>
              </View>
              <Text style={styles.paneltext}>
                {"\u2022 Date: "} {this.state.date}
              </Text>
              <Text style={styles.paneltext}>
                {"\u2022 Start Time: "} {this.state.starttime}
              </Text>
              <Text style={styles.paneltext}>
                {"\u2022 End Time: "} {this.state.endtime}
              </Text>
              <Text style={styles.paneltext}>
                {"\u2022 Trip Length: "} {this.state.length}
              </Text>
              <View style={styles.header}>
                <Icon2 color="#ffffff" height={20} name="achievement" />
                <Text
                  style={{
                    marginLeft: "3%",
                    color: "#ffffff",
                    fontFamily: "Quicksand-Regular",
                  }}
                >
                  {" "}
                  Landmark Report{" "}
                </Text>
              </View>
              <FlatList
                data={this.state.locationList2}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.landmarkNumber}
              />
              <View
                style={{
                  marginHorizontal: "20%",
                  marginVertical: "2%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Text style={styles.paneltext}>Share Trip: </Text>
                <AwesomeButtonBlue
                  progress
                  type="primary"
                  height={30}
                  onPress={() => {
                    //ADD sms FUNCTION HERE
                    var recipient = "0123456789";
                    this.sendSMSMsg(recipient, this.state.msgtosend);
                  }}
                >
                  <Icon2 color="#ffffff" height={15} name="message" />
                  <Text style={styles.textButtonsmall}>SMS</Text>
                </AwesomeButtonBlue>

                <AwesomeButtonBlue
                  progress
                  type="primary"
                  height={30}
                  onPress={() => {
                    //ADD email FUNCTION HERE
                    var emailAddr = "";
                    this.sendEmailMsg({
                      recipients: emailAddr,
                      subject: "Auto Narrator Trip Report",
                      body: this.state.msgtosend,
                    });
                  }}
                >
                  <Icon2 color="#ffffff" height={15} name="letter" />
                  <Text style={styles.textButtonsmall}>Email</Text>
                </AwesomeButtonBlue>
              </View>
              <View style={styles.button}>
                <AwesomeButtonBlue
                  progress
                  type="primary"
                  height={40}
                  onPress={() => {
                    this.displayModal(!this.state.isVisible);
                    this.clearLocationList();
                  }}
                >
                  <Text style={styles.textButton}>Close Panel</Text>
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

//REDUX
function mapStateToProps(state) {
  return {
    voice: state.settings.voiceName,
    speed: state.settings.talkSpeed,
    timeBetween: state.settings.timeBetween,
    visited: state.visited,
    pastTrips: state.pastTrips,
  };
}

export default connect(mapStateToProps)(HomeScreen);

//STYLESHEET
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
  paneltextsmall: {
    fontSize: 12,
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
  textButtonsmall: {
    fontSize: 12,
    fontFamily: "Quicksand-Regular",
    color: "#fff",
    paddingRight: 5,
    textAlign: "center",
  },
  closeText: {
    fontSize: 24,
    color: "#00479e",
    textAlign: "center",
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
  item: {
    marginVertical: 8,
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
});
