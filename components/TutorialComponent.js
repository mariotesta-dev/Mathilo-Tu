import {
    TouchableOpacity,
    StyleSheet,
    Image,
    View,
    Modal,
    Text,
    Pressable,
  } from 'react-native';
  
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { tutorial } from './tutorial';
  
  const TutorialComponent = ({textTutorial, setTextTutorial}) => {

    const handlerPreviousStep = () => {
        let index = tutorial.findIndex(t => t == textTutorial);
        index = index - 1;
        if(index >= 0) {
            let newText = tutorial[index];
            setTextTutorial(newText);
        }
    }
    return (
        <>
            <TouchableOpacity
              style={styles.previousStep}
              onPress={handlerPreviousStep}>
              <Text style={styles.previousStepText}>
                Previous step
              </Text>
            </TouchableOpacity>
            <View style={styles.innerContainer}>
                <Text style={styles.textTutorial}>{textTutorial}</Text>
            </View>
            <FastImage style={styles.avatarMan} source={require('../assets/Party_Phil_SSBU.png')}/>
        </>
    );
  };
  
  var styles = StyleSheet.create({
    innerContainer: {
        position: 'absolute',
        borderWidth: 3,
        padding: 10,
        backgroundColor: 'rgb(250,250,250)',
        height: 'auto',
        width: 300,
        left: 10,
        top: '33%',
        borderRadius: 15
    },
    avatarMan: {
        position: 'absolute',
        top: 400,
        left: 90,
        height: 180,
        width: 80
    },
    textTutorial: {
        color: 'black'
    },
    previousStep: {
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        top: 355,
        left: 10,
        width: 150,
        height: 40,
        borderRadius: 15,
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      previousStepText: {
        fontWeight: 'bold',
        color: 'rgba(255,255,255,0.5)',
      },
  });
  
  export default TutorialComponent;
  