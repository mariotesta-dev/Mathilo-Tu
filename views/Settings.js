import {View, Text, StyleSheet, Switch} from 'react-native';
import React, {useState} from 'react';
import BackBtn from '../components/BackBtn';
import {Picker} from '@react-native-picker/picker';

const Settings = ({navigation}) => {
  const [isEnabledVibration, setIsEnabledVibration] = useState(false);
  const [isEnabledMute, setIsEnabledMute] = useState(false);
  const [language, setLanguage] = useState('English');

  const toggleSwitchVibration = () => {
    setIsEnabledVibration(!isEnabledVibration);
  };

  const toggleSwitchMute = () => {
    setIsEnabledMute(!isEnabledMute);
  };

  return (
    <View style={styles.settingsContainer}>
      <BackBtn navigation={navigation} />
      <Text style={styles.title}>Settings</Text>
      <View style={styles.credits}>
        <View style={styles.setting}>
          <Text style={styles.creditsText}>Vibration</Text>
          <Switch
            accessibilityRole="button"
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledVibration ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchVibration}
            value={isEnabledVibration}
          />
        </View>
        <View style={styles.setting}>
          <Text style={styles.creditsText}>Mute</Text>
          <Switch
            accessibilityRole="button"
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabledMute ? '#fff' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchMute}
            value={isEnabledMute}
          />
        </View>
        <View style={styles.settingLanguage}>
          <Text style={styles.creditsText}>Language</Text>
          <Picker
            selectedValue={language}
            style={{
              height: 100,
              width: '100%',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
            onValueChange={(itemValue, itemIndex) => setLanguage(itemValue)}>
            <Picker.Item label="English" value="English" />
          </Picker>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaee',
    padding: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  credits: {
    backgroundColor: '#fffaee',
    width: '100%',
    height: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  creditsText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  setting: {
    display: 'flex',
    flexDirection: 'row',
    width: 240,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 3,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  settingLanguage: {
    display: 'flex',
    flexDirection: 'column',
    width: 240,
    alignItems: 'flex-start',
    borderWidth: 3,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
});

export default Settings;
