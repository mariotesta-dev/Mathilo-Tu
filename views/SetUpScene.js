import {Picker} from '@react-native-picker/picker';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {StyleSheet} from 'react-native';
import BackBtn from '../components/BackBtn';
import {objects} from './objects';
import {environments} from './environments';

const SetUpScene = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  const [environment, setEnvironment] = useState(environments[0].environment);
  const [name, setName] = useState('');
  const [valid, setValid] = useState(true);
  const currentScenarios = route.params.currentScenarios;
  const setCurrentScenarios = route.params.setCurrentScenarios;

  useEffect(() => {
    if (name.length > 0) {
      setValid(true);
    }
  }, [name]);

  const handleCreate = () => {
    if (name.length > 0) {
      setValid(true);
      /* Ok */
    } else {
      setValid(false);
    }
  };

  const getCategories = () => {
    let index = environments.findIndex(env => env.environment === environment);

    return environments[index].categories[0];
  };

  return (
    <View style={styles.homeContainer}>
      <BackBtn navigation={navigation} />
      <View style={styles.btnList}>
        <TextInput
          style={valid ? styles.input : styles.inputInvalid}
          placeholder={
            valid ? 'Name your scenario...' : 'Please enter a name...'
          }
          placeholderTextColor={valid ? '#565656' : 'rgba(255,0,0,0.5)'}
          onChangeText={setName}
          value={name}
        />
        <View style={styles.savedList}>
          <Text style={styles.savedText}>Choose your starting environment</Text>
          <Picker
            style={styles.pickerWheel}
            selectedValue={environment}
            itemStyle={{fontSize: 20}}
            onValueChange={(itemValue, itemIndex) => setEnvironment(itemValue)}>
            {[...new Set(objects.map(obj => obj.environment))].map(cat => {
              return <Picker.Item key={cat} label={cat} value={cat} />;
            })}
          </Picker>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPressIn={() => {
              setLoading(true);
              handleCreate();
            }}
            onPressOut={() => {
              setLoading(false);
              if (valid) {
                navigation.navigate('Scene', {
                  isNewScenario: true,
                  environment: environment,
                  category: getCategories(),
                  name: name,
                  currentScenarios: currentScenarios,
                  setCurrentScenarios: setCurrentScenarios,
                });
              }
            }}>
            {!loading ? (
              <Text style={styles.primaryBtnText}>Let's go!</Text>
            ) : (
              <ActivityIndicator color="#000" />
            )}
          </TouchableOpacity>
        </View>
      </View>
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
  title: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  btnList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 50,
    alignItems: 'center',
  },
  input: {
    height: 55,
    width: 220,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgb(250,250,250)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputInvalid: {
    height: 55,
    width: 220,
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgb(250,250,250)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savedList: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 20,
    alignItems: 'center',
    maxHeight: 230,
  },
  savedText: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#464646',
  },
  primaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
    width: 155,
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
  primaryBtn2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 16,
    backgroundColor: '#464646',
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
    width: 190,
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
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  pickerWheel: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
    marginBottom: 20,
  },
});

export default SetUpScene;
