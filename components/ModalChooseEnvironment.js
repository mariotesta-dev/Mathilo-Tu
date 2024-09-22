import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

const ModalEditScenario = ({
  modalVisible,
  setModalVisible,
  environments,
  setCategory,
  setEnvironment,
}) => {
  const handlerSelectEnvironment = obj => {
    setEnvironment(obj.environment);
    setModalVisible(false);
    setCategory(obj.categories[0]);
  };

  return (
    <React.Fragment>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
            <View style={styles.modalView}>
              <Text style={[styles.textStyle, {marginBottom: 20}]}>
                Change the environment
              </Text>
              <ScrollView contentContainerStyle={styles.scrollview}>
                {environments.map((obj, key) => {
                  return (
                    <TouchableOpacity
                      key={key}
                      onPress={() => {
                        handlerSelectEnvironment(obj);
                      }}
                      style={styles.secondaryBtn}>
                      <Text style={styles.textStyle}>{obj.environment}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
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
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  scrollview: {
    marginTop: 10,
    width: '100%',
    maxHeight: 170,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalView: {
    display: 'flex',
    justifyContent: 'space-around',
    height: 280,
    width: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
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
    marginBottom: 10,
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
    marginBottom: 25,
    textAlign: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    height: 55,
    width: 220,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: 'black',
    padding: 10,
    backgroundColor: 'rgb(250,250,250)',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputInvalid: {
    height: 55,
    width: 220,
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'rgb(250,250,250)',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModalEditScenario;
