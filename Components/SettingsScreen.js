import React, { Component } from "react";
import { Button, StyleSheet, View, Text, Alert } from "react-native";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import * as Speech from "expo-speech";
import Icon from 'react-native-ico-flags';
import Icon2 from 'react-native-ico-ui-interface';
import Icon3 from 'react-native-ico-essential';
import AwesomeButtonBlue from "react-native-really-awesome-button/src/themes/blue";


function DropdownItem(label) {
  this.label = label;
}

export default class SettingsScreen extends Component {
  constructor() {
    super();
    var voiceList = [
      {
        label: "US - Male",
        value: "en-us-x-sfg#male_3-local",
        icon: () => <Icon name="united-states-of-america" size={18} />
      },
      {
        label: "US - Female",
        value: "en-us-x-sfg#female_3-local",
        icon: () => <Icon name="united-states-of-america" size={18}/>
      },
      {
        label: "UK - Male",
        value: "en-gb-x-rjs-network",
        icon: () => <Icon name="united-kingdom" size={18}/>
      },
      {
        label: "UK - Female",
        value: "en-gb-x-fis-local",
        icon: () => <Icon name="united-kingdom" size={18} />
      },
      {
        label: "AUS - Male",
        value: "en-au-x-aub-network",
        icon: () => <Icon name="australia" size={18}/>
      },
      {
        label: "AUS - Female",
        value: "en-au-x-auc-network",
        icon: () => <Icon name="australia" size={18} />
      },
      {
        label: "IND - Male",
        value: "en-in-x-cxx#male_1-local",
        icon: () => <Icon name="india" size={18} />
      },
      {
        label: "IND - Female",
        value: "en-in-x-cxx-network",
        icon: () => <Icon name="india" size={18} />
      },
    ];

    var timeList = [
      {
        label: "30 seconds",
        value: 30
      },
      {
        label: "1 minute",
        value: 60
      },
      {
        label: "5 minutes",
        value: 300
      },
      {
        label: "10 minutes",
        value: 600
      },
      {
        label: "15 minutes",
        value: 900
      },
      {
        label: "20 minutes",
        value: 1200
      },
      {
        label: "30 minutes",
        value: 1800
      },
      {
        label: "45 minutes",
        value: 2700
      },
      {
        label: "1 hour",
        value: 3600
      },
    ];

    this.state = {
      rate: 1.0,
      pitch: 1.0,
      label: "US - Female",
      voice: "en-us-x-sfg#female_3-local",
      vList: voiceList,
      tList: timeList,
      time: 300,
    };
  }

  async speaktest(){
    var thingToSay = "This is the voice "+ (this.state.label) +" at the speed " + this.state.rate + ". If you do not like it feel free to change the settings.";
    Speech.speak(thingToSay, {voice: this.state.voice, rate: this.state.rate});
  }

  createTwoButtonAlert = () =>
    Alert.alert(
      "Are you sure?",
      "You are about to delete all local data. Confirm to continue.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"), //PUT FUNCTION TO DELETE DATA
          style: "cancel"
        },
        { text: "Confirm", onPress: () => console.log("Confirm Pressed") }
      ]
    );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon3 color= "#ffffff" height= {20} name="speaker-2"/>
          <Text style={{color: "#ffffff"}}> Voice Settings </Text>
        </View>
        <View style={styles.settings}>
          <Text>English Voice Accent:</Text>
          <DropDownPicker
            items={this.state.vList}
            defaultValue={this.state.voice}
            containerStyle={{ height: 40, width: "48%", marginBottom: 10, marginTop: 10, marginRight: "4%"}}
            style={{ backgroundColor: "#fafafa"}}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa",  elevation: 999  }}
            onChangeItem={(item) =>
              this.setState({
                voice: item.value,
                label: item.label,
              })
            }
          />
        </View>
        <View style={styles.settings}>
          <Text>
            Voice Speed: {this.state.rate && +this.state.rate.toFixed(3)}
          </Text>
          <Slider
            step={0.5}
            style={styles.slider}
            onValueChange={(rate) => this.setState({ rate: rate })}
            minimumValue={0.5}
            maximumValue={3.5}
            value={this.state.rate}
          />
        </View>
        <View style={styles.settings}>
          <AwesomeButtonBlue
            progress
            type= "primary"
            height= {40}
            onPress={next => {
            this.speaktest();
            next();
            }}
          >
            Click Here to Test Voice
          </AwesomeButtonBlue>
        </View>
        <View style={styles.header}>
          <Icon3 color= "#ffffff" name="settings"/>
          <Text style={{color: "#ffffff"}}> Other Settings </Text>
        </View>
        <View style={styles.settings}>
          <Text>Time Between Landmarks: </Text>
          <DropDownPicker
            items={this.state.tList}
            defaultValue={this.state.time}
            containerStyle={{ height: 40, width: "48%", marginBottom: 10, marginTop: 10, marginRight: "4%"}}
            style={{ backgroundColor: "#fafafa"}}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            dropDownStyle={{ backgroundColor: "#fafafa",  elevation: 999  }}
            onChangeItem={(item) =>
              this.setState({
                time: item.value
              })
            }
          />
        </View>
        <View style={styles.settings}>
          <AwesomeButtonBlue
            progress
            type= "primary"
            height= {40}
            onPress={next => {
            this.createTwoButtonAlert();
            next();
            }}
          >
            Click Here to Clear Data
          </AwesomeButtonBlue>
        </View>
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
    width: "57%",
    opacity: 1,
    height: 50,
    marginTop: 0,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "500",
    margin: 10,
  },
  header: {
    backgroundColor: "#214988",
    fontWeight: "bold",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    width: "95%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius:10,
    
  },
  settings: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
