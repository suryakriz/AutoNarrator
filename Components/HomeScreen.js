import * as React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { loadNearMePage } from '../backend/WebScraping';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { not } from 'react-native-reanimated';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.loadWebData = this.loadWebData.bind(this);
		this.state = {
			webText: 'Testing'
		}	
	}
	render() {
		return (
			<View style={styles.container}>
				<Text>Welcome to AutoNarrator!</Text>
				<Text>{this.state.webText}</Text>
				<Button
					onPress={this.loadWebData}
					title="Load Page"
				/>
			</View>
		);
	}
	
	async loadWebData() {
		//notVisited 
		var notVisited = true;
		//put together the longitude and latitude of a current location
		var longitude = '-96.334643';
		var latitude = '30.592205';
		//pull the list of locations from the longitude and latitiude 
		const cheerio = require('cheerio');
		const searchUrl = 'https://www.hmdb.org/nearbylist.asp?nearby=yes&Latitude=' + latitude + '&Longitude=' + longitude + '&submit=Show+List' ;
		var response = await fetch(searchUrl);
		var htmlString = await response.text();
		const listOfLocations = cheerio.load(htmlString)('a:even', 'li');
		console.log('------------------------------------------------');
		for(var i = 0; i < listOfLocations.length; i++) {
			console.log(listOfLocations.eq(i).text()); // logs individual sections
			if (notVisited){
				const locationUrl = 'https://www.hmdb.org/' + listOfLocations.eq(i).attr('href') //website of the 
				response = await fetch(locationUrl);
				htmlString = await response.text();
				//INFORMATION TO BE READ BY THE READER
				var landmarkInfo = cheerio.load(htmlString)('#inscription1').text();
				//console.log("INFO ON PAGE");
				//console.log(landmarkInfo);
				notVisited = false;
			}
		}
		console.log('------------------------------------------------');
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;