import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  SectionList,
  Touchable
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { VisitedListAdd } from '../Redux/VisitedSlice'
import PastTrip from './PastTrip'

class LastDriveScreen extends React.Component {

  constructor(props) {
    super(props);

  }
  renderItem = ({ item }) => (
      <PastTrip
      tripdate={item.tripdate}
      triplength={item.triplength}
      numlandmarks={item.numlandmarks}
      landmarks={item.landmarks}
    />
    
  );
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.props.pastTrips}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      </View>
    );
  }
}

function mapStateToProps(state) {
	return {
    pastTrips: state.pastTrips
	}
}
  
export default connect(mapStateToProps)(LastDriveScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  landinfo: {
    fontSize: 15
  }
});