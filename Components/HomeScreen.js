import * as React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { loadNearMePage } from '../backend/WebScraping';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
		const cheerio = require('cheerio');
		const searchUrl = 'https://www.hmdb.org/nearbylist.asp?nearby=yes&Latitude=30.6155318&Longitude=-96.3333562&submit=Show+List';
		const response = await fetch(searchUrl);
		
		const htmlString = await response.text();
		const cheerioResult = cheerio.load(htmlString);
		console.log("Testing" + cheerioResult);
		this.setState({webText: htmlString}); 
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