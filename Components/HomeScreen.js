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

  speak() {
    if (this.state.index == 0) {
      var thingToSay = "Today, we will be testing voice:";

      Speech.speak(thingToSay, { voice: this.props.voice });
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
	  voice: state.settings.voiceName
	}
}
  
export default connect(mapStateToProps)(TTS)

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

<<<<<<< HEAD
export default () => {
	const dispatch = useDispatch();
	return (
		<HomeScreen dispatch={dispatch}/>
	)
}
=======
export default HomeScreen;
>>>>>>> 71ee13f05566b65f669e1d245ee0207dd91b0b9d
