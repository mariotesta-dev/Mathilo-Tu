import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import pencil from '../assets/pencil.png';
import play from '../assets/play.png';

import React from 'react';

const PlayEditBtn = ({
  isEditModeOn,
  setEditMode,
  setShowEditUI,
  selectedObjects,
  setSelectedObjects,
}) => {
  const handleSelections = () => {
    let list = [...selectedObjects];
    list.map(o => (o.isSelected = false));
    setSelectedObjects(list, true);
  };

  const handlePress = () => {
    setEditMode(!isEditModeOn);
    setShowEditUI(false);
    handleSelections();
  };
  return (
    <TouchableOpacity style={styles.playEditBtn} onPress={() => handlePress()}>
      <Image source={!isEditModeOn ? pencil : play} style={styles.img} />
    </TouchableOpacity>
  );
};

var styles = StyleSheet.create({
  playEditBtn: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 25,
    right: 10,
    borderWidth: 3,
    borderRadius: 15,
    height: 80,
    width: 100,
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
    width: 40,
    height: 40,
  },
});

export default PlayEditBtn;
