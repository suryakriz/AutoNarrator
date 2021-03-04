import * as React from 'react';
import { View, StyleSheet, Button, FlatList, Text } from 'react-native';
import * as Speech from 'expo-speech';


const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingTop: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
});

function TextToSpeech() {
    const speak = () => {
        const options = {};
        const thingToSay = 'Welcome, to today\'s text to speech demo';
        Speech.speak(thingToSay, {voice: 'en-GB-language'});
        Speech.getAvailableVoicesAsync().then(x=> console.log(x));
        Speech.speak(thingToSay, {voice: 'en-gb-x-gba-network'});
        Speech.speak(thingToSay, {voice: 'en-us-x-sfg-network'});
        Speech.speak(thingToSay, {voice: 'fr-ca-x-caa-network'});
        Speech.speak(thingToSay, {voice: 'cmn-tw-x-ctd-network'});
        Speech.speak(thingToSay, {voice: 'ja-jp-x-htm-network'});
    };
    return(
        <View>
            <Button title="TTS2" onPress={speak} />
            
        </View>
        
    );   
}


export default TextToSpeech;