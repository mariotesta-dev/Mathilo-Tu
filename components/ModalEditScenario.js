import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import close from '../assets/close.png';

const ModalEditScenario = ({
  name,
  setName,
  modalVisible,
  setModalVisible,
  id,
  currentScenarios,
  setCurrentScenarios,
  handleSaveScenarios,
  scenario,
}) => {
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [renameClicked, setRenameClicked] = useState(false);

  const [currentName, setCurrentName] = useState(name);
  const [valid, setValid] = useState(true);

  const handleClose = () => {
    setDeleteClicked(false);
    setRenameClicked(false);
    setCurrentName(name);
    setValid(true);
  };

  const handleDelete = () => {
    setCurrentScenarios(state => {
      const list = [...state];

      const index = list.findIndex(s => s.id === id);

      list.splice(index, 1);

      return list;
    });
    //handleSaveScenarios();
  };

  const handleRename = async () => {
    if (currentName.length > 0) {
      await setCurrentScenarios(state => {
        const list = state.slice();

        const index = list.findIndex(s => s.id === id);

        list[index].title = currentName;

        console.log(list[index]);

        return list;
      });
      setValid(true);
      setName(currentName);
      setRenameClicked(false);
      setModalVisible(false);
    } else {
      setValid(false);
    }
    //handleSaveScenarios(currentScenarios);
  };

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
        <View style={styles.centeredView}>
          <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
            <View style={styles.modalView}>
              {deleteClicked && (
                <>
                  <Text style={styles.textStyle}>
                    Are you sure you want to delete?
                  </Text>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.secondaryBtnDelete,
                        {backgroundColor: 'rgb(193, 22, 36)'},
                      ]}
                      onPress={() => {
                        handleDelete();
                        setDeleteClicked(false);
                        setModalVisible(false);
                      }}>
                      <Text style={[styles.textStyle, {color: 'white'}]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtnDelete}
                      onPress={() => {
                        handleClose();
                      }}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {renameClicked && (
                <>
                  <TextInput
                    style={valid ? styles.input : styles.inputInvalid}
                    placeholder="Name your scenario..."
                    placeholderTextColor={'#565656'}
                    value={currentName}
                    onChangeText={setCurrentName}
                  />
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      width: '100%',
                    }}>
                    <TouchableOpacity
                      style={[
                        styles.secondaryBtnDelete,
                        {backgroundColor: 'rgba(10,173,33,1)'},
                      ]}
                      onPress={() => handleRename()}>
                      <Text style={[styles.textStyle, {color: 'white'}]}>
                        Rename
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.secondaryBtnDelete}
                      onPress={() => {
                        handleClose();
                      }}>
                      <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {!deleteClicked && !renameClicked && (
                <>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => {
                      handleClose();
                      setModalVisible(!modalVisible);
                    }}>
                    <Image
                      source={close}
                      style={{
                        height: 35,
                        width: 35,
                        borderWidth: 3,
                        borderRadius: 20,
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => setRenameClicked(true)}>
                    <Text style={styles.textStyle}>Rename</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => setDeleteClicked(true)}>
                    <Text style={styles.textStyle}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
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
