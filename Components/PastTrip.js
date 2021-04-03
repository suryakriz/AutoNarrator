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
import Icon from 'react-native-ico-ui-interface';
import Icon2 from 'react-native-ico-miscellaneous';
import Icon3 from 'react-native-ico-basic';
import Dash from 'react-native-dash';
import * as Font from "expo-font";

let customFonts = {
  "Quicksand-Regular": require("../assets/fonts/Quicksand-Regular.ttf"),
};



export default class PastTrips extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisibile: false,
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
                  modalVisibile: !this.state.modalVisibile,
                  mainIcon: !this.state.mainIcon
                })
              }}
            >
              <View style={styles.header}>
                <Icon2 color="#ffffff" height={20} name="car" />
                <Text style={{fontFamily: "Quicksand-Regular", marginLeft:"3%" , color: "#ffffff", fontSize: 20, }}> Drive Information </Text>  
              </View>
                <Text style={styles.landinfo}>{"Drive Date: "}{this.props.tripdate}</Text>
                <Text style={styles.landinfo}>{"Drive Length: "}{this.props.triplength}</Text>
                <View style ={{flexDirection: "row"}}>
                  <Text style={styles.landinfo}>{"Number of Landmarks: "}{this.props.numlandmarks}</Text>
                  {this.state.mainIcon && <Icon  name="down-arrow-1" color= "#fff" style = {{position: 'absolute', right: 2}}/>}
                  {!this.state.mainIcon && <Icon  name="up-arrow-1" color= "#fff" style = {{position: 'absolute', right: 2}}/>}
                </View>
            </TouchableOpacity>
            {this.state.modalVisibile && 
              <View style={{marginTop: 10}}> 
                <Dash dashColor= "#fff" dashLength= {10} dashGap = {15} style={{width:"100%", height:1}}/>
              </View>
            }
            {this.state.modalVisibile &&
              <View style={styles.header2}>
                <Icon3 color="#ffffff" height={20} name="achievement" />
                <Text style={{fontFamily: "Quicksand-Regular", marginLeft:"3%" , color: "#ffffff", fontSize: 20, }}> Landmarks </Text>  
              </View>
            }
            {modal}
          </View>
        );
    }
}

const styles = StyleSheet.create({
    modal: {
      height: "50%",
    },
    item: {
      backgroundColor: "#214988",
      padding: 20,
      marginVertical: 8,
      borderWidth: 0,
      borderRadius: 10,
      
    },
    landinfo: {
      fontSize: 15,
      color: '#fff',
      fontFamily: "Quicksand-Regular",
    },
    header: {
      fontWeight: "bold",
      paddingBottom: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: 10,
    },
    header2: {
      fontWeight: "bold",
      paddingBottom: 10,
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      borderRadius: 10,
    },
  });