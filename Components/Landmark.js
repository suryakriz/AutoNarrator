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

export default class Landmark extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
          modalVisible: false
      }
    }

    render() {
        let modal;
        if (this.state.modalVisible) {
            modal = 
            <View style={styles.item}>
                <Text style={styles.landinfo}>{this.props.landmarkDescription}</Text>
            </View>
        } else {
            modal = null
        }
        return (
            <TouchableOpacity style={styles.item}
                onPress={() => {
                    this.setState({
                        modalVisible: !this.state.modalVisible
                    })
                }}
            >
                <Text style={styles.landinfo}>{this.props.landmarkName}</Text>
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
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8,
      borderWidth: 5
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    landinfo: {
      fontSize: 15
    }
  });