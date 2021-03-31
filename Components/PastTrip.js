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
import { PickerItem } from "react-native/Libraries/Components/Picker/Picker";
import Landmark from './Landmark'

export default class PastTrip extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          modalVisibile: false,
      }
    }

    renderItem = ({item}) => (
      <Landmark
        landmarkName={item.landmarkName}
        landmarkDescription={item.landmarkDescription}
      />
    )

    render() {
      let modal;
      if (this.state.modalVisibile) {
        modal = <FlatList
        data={this.props.landmarks}
        renderItem={this.renderItem}
        keyExtractor={item => item.landmarkNumber}
      />
      } else {
        modal = null;
      }
        return (
          <View style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  modalVisibile: !this.state.modalVisibile
                })
              }}
            >
                <Text style={styles.tripdate}>{this.props.tripdate}</Text>
                <Text style={styles.triplength}>{this.props.triplength}</Text>
                <Text style={styles.numlandmarks}>{this.props.numlandmarks}</Text>

            </TouchableOpacity>
            {modal}
          </View>
        );
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
  });