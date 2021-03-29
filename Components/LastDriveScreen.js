import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  SectionList
} from "react-native";
import { connect } from "react-redux";
import { VisitedListAdd } from '../Redux/VisitedSlice'

class LastDriveScreen extends React.Component {

  constructor(props) {
    super(props);

  }
  // renderItem = ({ item }) => (
  //   <Item
  //     tripdate={item.tripdate}
  //     triplength={item.triplength}
  //     numlandmarks={item.numlandmarks}
  //     landmarks={item.landmarks}
  //   />
  // );
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item landinfo={item} />}
          renderSectionHeader={({
            section: { tripdate, triplength, numlandmarks }
          }) => (
            <Text style={styles.header}>
              {tripdate}
              {triplength}
              {numlandmarks}
            </Text>
          )}
        />
    </SafeAreaView>
      // <View style={styles.container}>
      //   <SafeAreaView style={styles.container}>
      //     <FlatList
      //       data={this.props.pastTrips}
      //       renderItem={this.renderItem}
      //       keyExtractor={item => item.id}
      //     />
      //   </SafeAreaView>
      // </View>
    );
  }
}

const Item = ({ landinfo }) => (
  <View style={styles.item}>
    <Text style={styles.landinfo}>{landinfo}</Text>
  </View>
);

// const Item = ({ tripdate, triplength, numlandmarks }) => (
//   <View style={styles.item}>
//     <Text style={styles.tripdate}>{tripdate}</Text>
//     <Text style={styles.triplength}>{triplength}</Text>
//     <Text style={styles.numlandmarks}>{numlandmarks}</Text>
//   </View>
// );

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