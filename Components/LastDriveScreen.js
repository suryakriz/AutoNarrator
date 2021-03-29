import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import { VisitedListAdd } from '../Redux/VisitedSlice'

class LastDriveScreen extends React.Component {

  constructor(props) {
    super(props);

  }
  renderItem = ({ item }) => (
    <Item
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

const Item = ({ tripdate, triplength, numlandmarks }) => (
  <View style={styles.item}>
    <Text style={styles.tripdate}>{tripdate}</Text>
    <Text style={styles.triplength}>{triplength}</Text>
    <Text style={styles.numlandmarks}>{numlandmarks}</Text>
  </View>
);

function mapStateToProps(state) {
	return {
    pastTrips: state.pastTrips
	}
}
  
export default connect(mapStateToProps)(LastDriveScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    backgroundColor: "#2870C2",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20
  },
  tripdate: {
    fontSize: 15
  },
  triplength: {
    fontSize: 15
  },
  numlandmarks: {
    fontSize: 15
  }
});