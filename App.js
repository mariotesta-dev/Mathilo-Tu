import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, StyleSheet, Text, LogBox} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './redux/store';
import {Provider} from 'react-redux';

import Homepage from './views/Homepage';
import Settings from './views/Settings';
import Credits from './views/Credits';
import Selection from './views/Selection';
import Scene from './views/Scene';
import SetUpScene from './views/SetUpScene';
import Tutorial from './views/Tutorial';

const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <StatusBar barStyle={'dark-content'} />
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              header: false,
            }}>
            <Stack.Screen name="Homepage" component={Homepage} />
            <Stack.Screen name="Tutorial" component={Tutorial} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Credits" component={Credits} />
            <Stack.Screen name="Selection" component={Selection} />
            <Stack.Screen name="SetUpScene" component={SetUpScene} />
            <Stack.Screen name="Scene" component={Scene} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

var styles = StyleSheet.create({});
