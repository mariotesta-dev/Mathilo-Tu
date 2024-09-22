import {StyleSheet, Text, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';

const TopScrollView = ({environment, setShowModalChooseEnvironment}) => {
  const onClickEnvironmentHandler = () => {
    setShowModalChooseEnvironment(true);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onClickEnvironmentHandler}>
      <View style={styles.externalContainer}>
        <Text style={styles.environmentLabel}>{environment}</Text>
        <View style={styles.innerContainer}>
          <Text style={styles.changeText}>Change</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const TopLabel = ({environment}) => {
  return (
    <TouchableOpacity disabled={true} style={styles.container2}>
      <Text style={styles.environmentLabel2}>{environment}</Text>
    </TouchableOpacity>
  );
};

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    marginLeft: -120,
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    height: 50,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    position: 'absolute',
    top: 22.5,
    left: '50%',
    marginLeft: -120,
    borderWidth: 3,
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    height: 50,
    width: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  environmentLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 5,
    marginLeft: 46,
    marginRight: 20,
    marginBottom: 11,
  },
  environmentLabel2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    top: 5,
    marginBottom: 10,
  },
  innerContainer: {
    borderRadius: 12,
    backgroundColor: 'grey',
    opacity: 0.7,
  },
  changeText: {
    display: 'flex',
    padding: 7,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  externalContainer: {
    display: 'flex',
    flexDirection: 'row',
    right: -20,
  },
  containerLabel: {
    position: 'absolute',
    left: '50%',
    marginLeft: -140,
    top: 22.5,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default TopScrollView;
