import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BackBtn from '../components/BackBtn';

const Credits = ({navigation}) => {
  return (
    <View style={styles.creditsContainer}>
      <BackBtn navigation={navigation} />
      <Text style={styles.title}>Credits</Text>
      <View style={styles.credits}>
        <Text style={styles.creditsText}>
          This high-fidelity prototype of Math-ilo Tu! was created for the
          "Human Computer Interaction" course held on Politecnico Di Torino,
          during the academic year 2022/2023.
        </Text>
        <Text style={styles.creditsText}>The Islanders</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  creditsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffaee',
    padding: 150,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  credits: {
    backgroundColor: '#fffaee',
    height: '50%',
    width: '100%',
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
});

export default Credits;
