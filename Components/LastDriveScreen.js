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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function LastDriveScreen({ navigation }) {
  const DATA = [
    {
      tripdate: "01/04/2021",
      triplength: "1 hour",
      numlandmarks: "3 landmarks",
      id: "1"
    },
    {
      tripdate: "01/31/2021",
      triplength: "2 hours",
      numlandmarks: "4 landmarks",
      id: "2"
    },
    {
      tripdate: "02/12/2021",
      triplength: "5 hours",
      numlandmarks: "16 landmarks",
      id: "3"
    },
    {
      tripdate: "02/22/2021",
      triplength: "10 minutes",
      numlandmarks: "1 landmark",
      id: "4"
    },
    {
      tripdate: "03/04/2021",
      triplength: "45 minutes",
      numlandmarks: "4 landmarks",
      id: "5"
    },
    {
      tripdate: "03/23/2021",
      triplength: "30 minutes",
      numlandmarks: "2 landmarks",
      id: "6"
    }
  ];

  const Item = ({ tripdate, triplength, numlandmarks }) => (
    <View style={styles.item}>
      <Text style={styles.tripdate}>{tripdate}</Text>
      <Text style={styles.triplength}>{triplength}</Text>
      <Text style={styles.numlandmarks}>{numlandmarks}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      tripdate={item.tripdate}
      triplength={item.triplength}
      numlandmarks={item.numlandmarks}
    />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

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

export default LastDriveScreen;
