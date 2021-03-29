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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

function LastDriveScreen({ navigation }) {
  const DATA = [
    {
      tripdate: "01/04/2021",
      triplength: "\n1 hour",
      numlandmarks: "\n2 landmarks",
      data: [
        [
          "Alamo",
          "\n\nThe Alamo Mission, commonly called the Alamo and " +
            "originally known as the Misión San Antonio de Valero, " +
            "is a historic Spanish mission and fortress compound founded " +
            "in the 18th century by Roman Catholic missionaries in what is " +
            "now San Antonio, Texas, United States."
        ],
        [
          "White House",
          "\n\nThe White House is the official residence and workplace of the president of the United States."
        ]
      ]
    },
    {
      tripdate: "01/31/2021",
      triplength: "\n10 minutes",
      numlandmarks: "\n1 landmarks",
      data: [
        [
          "MSC",
          "\n\nIn front of the MSC, there are 55 trees that surround Simpson Drill Field to honor the 55 Aggies that gave their lives in World War I."
        ]
      ]
    }
  ];

  const Item = ({ landinfo }) => (
    <View style={styles.item}>
      <Text style={styles.landinfo}>{landinfo}</Text>
    </View>
  );

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
  );
}

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

export default LastDriveScreen;
