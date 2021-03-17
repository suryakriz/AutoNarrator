import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import DropDownPicker from "react-native-dropdown-picker";
import * as Speech from "expo-speech";
import { SetVoice } from '../Redux/SettingsSlice'
import { useDispatch } from 'react-redux'
import Icon from 'react-native-ico-flags';


function DropdownItem(label) {
  this.label = label;
}

class SettingsScreen extends Component {
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
      voice: "en-us-x-sfg#female_3-local",
      vList: voiceList,
    };

    this.ChangeVoice = this.ChangeVoice.bind(this)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>English Voice:</Text>
        <DropDownPicker
          items={this.state.vList}
          defaultValue={this.state.voice}
          containerStyle={{ height: 40, width: "50%", marginBottom: 10 }}
          style={{ backgroundColor: "#fafafa" }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: "#fafafa" }}
          onChangeItem={(item) => this.ChangeVoice(item)}
        />
        <Text>
          Voice Rate of Speech: {this.state.rate && +this.state.rate.toFixed(3)}
        </Text>
        <Slider
          step={0.5}
          style={styles.slider}
          onValueChange={(rate) => this.setState({ rate: rate })}
          minimumValue={0}
          maximumValue={2}
          value={this.state.rate}
        />
        <Text>
          Voice Pitch: {this.state.pitch && +this.state.pitch.toFixed(3)}
        </Text>
        <Slider
          step={0.5}
          style={styles.slider}
          onValueChange={(pitch) => this.setState({ pitch: pitch })}
          minimumValue={0}
          maximumValue={2}
          value={this.state.pitch}
        />
      </View>
    );
  }

  ChangeVoice(newVoice) {
    this.setState({
      voice: newVoice.value,
    })
    this.props.dispatch(SetVoice(newVoice.value))
  }
  
}

export default () => {
	const dispatch = useDispatch();
	return (
		<SettingsScreen dispatch={dispatch}/>
	)
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
    marginTop: 0,
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    margin: 10,
  },
});
