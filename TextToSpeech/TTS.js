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

async function ttsList(){
    try{
        let r1 = await Speech.getAvailableVoicesAsync()
        var returnList = [];
        for(var i = 0; i < r1.length; i++){
            var loc = r1[i].identifier.indexOf('en');
            if(loc != -1){
                returnList.push(r1[i].identifier);
            }
        }
        return returnList;
    } catch(e){
        console.log(e);
        throw e;
    }
}

function TextToSpeech() {
    const speak = () => {
        const options = {};
        const thingToSay = 'Welcome, to today\'s text to speech demo';
        Speech.speak(thingToSay, {voice: 'en-GB-language'});
        
        //Print List of English Voices
        var listSpeech = [];
        ttsList().then(result => {
            console.log(result);
            listSpeech = result;
            for(var i = 0; i < listSpeech.length; i++){
                Speech.speak(thingToSay, {voice: listSpeech[i]});
            }
            
        }).catch(err => {
            console.log('error');
        });
            
        //Speech.speak(thingToSay, {voice: 'en-gb-x-gba-network'});
        //Speech.speak(thingToSay, {voice: 'en-us-x-sfg-network'});
        //Speech.speak(thingToSay, {voice: 'fr-ca-x-caa-network'});
        //Speech.speak(thingToSay, {voice: 'cmn-tw-x-ctd-network'});
        //Speech.speak(thingToSay, {voice: 'ja-jp-x-htm-network'});
    };
    return(
        <View>
            <Button title="TTS2" onPress={speak} />
        </View>
        
    );   
}


export default TextToSpeech;