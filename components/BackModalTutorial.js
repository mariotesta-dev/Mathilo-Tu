import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';

const BackModalTutorial = ({navigation, modalVisible, setModalVisible}) => {
  return (
    <React.Fragment>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.centeredView} pointerEvents={'box-none'}>
          <View style={styles.modalView}>
            <Text style={styles.textStyle}>
              Are you sure you want to quit the tutorial?
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                marginTop: 30,
              }}>
              <TouchableOpacity
                style={[styles.secondaryBtnDelete, {backgroundColor: 'red'}]}
                onPress={() => navigation.navigate('Homepage')}>
                <Text style={[styles.textStyle, {color: 'white'}]}>Quit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryBtnDelete}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.textStyle, {fontSize: 16}]}>
                  Keep me here
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    display: 'flex',
    justifyContent: 'space-around',
    height: 200,
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  secondaryBtnDelete: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 120,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'white',
    borderWidth: 3,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  input: {
    height: 55,
    width: 220,
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgb(250,250,250)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BackModalTutorial;
