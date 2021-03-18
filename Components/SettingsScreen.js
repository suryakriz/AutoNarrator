import React, { Component } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import * as Speech from "expo-speech";
import Icon from 'react-native-ico-flags';
import Icon2 from 'react-native-ico-ui-interface';
import Icon3 from 'react-native-ico-essential';


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

    this.state = {
      rate: 1.0,
      pitch: 1.0,
      label: "US - Female",
      voice: "en-us-x-sfg#female_3-local",
      vList: voiceList,
    };
  }


  speaktest(){
    var thingToSay = "This is the voice "+ (this.state.label) +" at the speed " + this.state.rate + ". If you do not like it feel free to change the settings.";
    Speech.speak(thingToSay, {voice: this.state.voice, rate: this.state.rate});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon2 color= "#ffffff" name="volume"/>
          <Text style={{color: "#ffffff"}}> Voice Settings </Text>
        </View>
        <View style={styles.settings}>
          <Text>English Voice:</Text>
          <DropDownPicker
            items={this.state.vList}
            defaultValue={this.state.voice}
            containerStyle={{ height: 40, width: "60%", marginBottom: 10, marginTop: 10 }}
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
        <Button 
          title= "Click Here to Test Voice" 
          onPress= {() => this.speaktest()}/>
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
    width: "65%",
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
    width: "90%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius:10,
    
  },
  settings: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
