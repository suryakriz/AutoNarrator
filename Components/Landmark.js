import * as React from "react";
import {
  Image,
  StatusBar,
  View,
  StyleSheet,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from 'react-native-ico-ui-interface';
import * as Font from "expo-font";

let customFonts = {
  "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
};


export default class Landmark extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
        modalVisible: false,
        mainIcon: true
    }
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

    render() {
        let modal;
        if (this.state.modalVisible) {
            modal = 
            <View style={styles.item2}>
                <Text style={styles.landinfo}>{this.props.landmarkDescription}</Text>
            </View>
        } else {
            modal = null
        }
        return (
            <TouchableOpacity style={styles.item}
                onPress={() => {
                    this.setState({
                        modalVisible: !this.state.modalVisible,
                        mainIcon: !this.state.mainIcon
                    })
                }}
            >
              <View>
                <Text style={styles.landname}>{this.props.landmarkName}</Text>
                {this.state.mainIcon && <Icon  name="down-arrow-1" color= "#000" style = {{position: 'absolute', right: 20, top: 20}}/>}
                {!this.state.mainIcon && <Icon  name="up-arrow-1" color= "#000" style = {{position: 'absolute', right: 20, top: 20}}/>}
              </View>  
                {modal}
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16
    },
    modal: {
      height: "50%",
    },
    item: {
      backgroundColor: "#fff",
      marginVertical: 8,
      borderWidth: 0,
      borderRadius: 10,
    },
    item2: {
      backgroundColor: "#fff",
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: 0,
      borderRadius: 10,
    },
    header: {
      fontWeight: "bold",
      paddingBottom: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: 10,
    },
    landname: {
      fontSize: 15,
      padding: 20,
      fontFamily: "Quicksand-Regular",
    },
    landinfo: {
      fontSize: 15,
      fontFamily: "Quicksand-Regular",
    }
  });