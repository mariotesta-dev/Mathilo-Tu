import React, {useState, useEffect} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Toast, {BaseToast} from 'react-native-toast-message';
import BackgroundAnimation from '../components/AnimatedPattern';
import logo from '../assets/logo.png';
import {useIsFocused} from '@react-navigation/native';

const Homepage = ({navigation}) => {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    information: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: 'red',
          height: 100,
          width: 500,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        text2Style={{fontSize: 14, fontWeight: 'bold'}}
      />
    ),
    saved: props => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: 'green',
          height: 100,
          width: 600,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
        contentContainerStyle={{paddingHorizontal: 15}}
        text1Style={{
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
        text2Style={{fontSize: 14, fontWeight: 'bold'}}
      />
    ),
  };

  useEffect(() => {
    Toast.show({
      type: 'information',
      text1: 'Important!⚠️',
      text2:
        'This is a prototype, you might find some bugs and unwanted behaviors!',
    });
  }, [isFocused]);

  return (
    <View style={styles.homeContainer}>
      <BackgroundAnimation />
      <Image source={logo} style={styles.logo}></Image>
      <View style={styles.btnList}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Selection')}>
          <Text style={styles.primaryBtnText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPressIn={() => {
            setLoading(true);
          }}
          onPressOut={() => {
            navigation.navigate('Tutorial', {
              isNewScenario: true,
              environment: 'Safari',
              category: 'Mammals',
              name: 'Tutorial',
            });
            setLoading(false);
          }}>
          {!loading ? (
            <Text style={styles.secondaryBtnText}>Tutorial</Text>
          ) : (
            <ActivityIndicator color="#000" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.secondaryBtnText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => navigation.navigate('Credits')}>
          <Text style={styles.secondaryBtnText}>Credits</Text>
        </TouchableOpacity>
      </View>

      <Toast config={toastConfig} />

      <Text style={styles.version}>Math-ilo Tu! v0.1.0</Text>
    </View>
  );
};

var styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaee',
  },
  logo: {
    height: 200,
    width: 520,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  btnList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 16,
    backgroundColor: 'rgba(10,173,33,1)',
    borderWidth: 3,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  primaryBtnText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: 160,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth: 3,
    marginBottom: 12,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  version: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    fontWeight: '600',
  },
});

export default Homepage;
