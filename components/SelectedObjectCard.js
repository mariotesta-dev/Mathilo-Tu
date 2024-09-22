import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

function SelectedObjectCard({
  obj,
  objects,
  selectedObjects,
  setSelectedObjects,
  objectsAdded,
  deleteObject,
  showEditUI,
  setShowEditUI,
  setObjectToEdit,
}) {
  const selectObject = () => {
    setSelectedObjects(state => {
      let list = [...state];
      const index = selectedObjects.findIndex(o => o.key === obj.key);
      const objectModified = {
        ...list[index],
        isSelected: !list[index].isSelected,
      };
      list[index] = objectModified;

      const indexObjToDeselect = selectedObjects.findIndex(
        o => o.key !== obj.key && o.isSelected === true,
      );
      const objToDes = {...list[indexObjToDeselect], isSelected: false};
      list[indexObjToDeselect] = objToDes;

      return list;
    });
    setObjectToEdit(obj);
  };

  const index = selectedObjects.findIndex(o => o.key === obj.key);

  return (
    <TouchableOpacity
      style={
        selectedObjects[index].isSelected
          ? styles.container
          : styles.disabledContainer
      }
      onPress={() => {
        selectObject();
      }}
      disabled={!objectsAdded}>
      <View style={styles.innerContainer}>
        <FastImage
          source={objects[obj.id].imageUri}
          style={styles.coverImageObject}
        />
      </View>
    </TouchableOpacity>
  );
}
export default SelectedObjectCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 130,
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  disabledContainer: {
    height: 120,
    width: 130,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  innerContainer: {
    flex: 2,
  },
  coverImageObject: {
    width: '100%',
    height: '100%',
  },
});
