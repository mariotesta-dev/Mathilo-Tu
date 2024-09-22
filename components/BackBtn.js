import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Modal,
  Text,
  Pressable,
} from 'react-native';

import React from 'react';

const BackBtn = ({navigation, fromScene, setModalVisible}) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() =>
          fromScene ? setModalVisible(true) : navigation.goBack(null)
        }>
        <Image
          source={require('../assets/chevron-left.png')}
          style={styles.img}
        />
      </TouchableOpacity>
    </React.Fragment>
  );
};

var styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 25,
    left: 10,
    borderWidth: 3,
    borderRadius: 15,
    height: 50,
    width: 60,
    backgroundColor: '#fff',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    zIndex: 1,
  },
  img: {
    width: 20,
    height: 30,
  },
});

export default BackBtn;
