import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

function SavedObjectCard({
  obj,
  objects,
  setSelectedObjects,
  objectsAdded,
  indexKey,
  setIndexKey,
  setSavedObjects,
  savedObjects,
}) {
  console.log(obj);
  const addObject = async () => {
    //add object to selected objects
    await setSelectedObjects(state => {
      let list = [...state];
      let index = savedObjects.findIndex(o => o.id === obj.id);
      list.push({...savedObjects[index], key: indexKey, isSelected: false});
      return list;
    });

    //remove object from saved objects
    await setSavedObjects(state => {
      let list = [...state];
      let index = list.findIndex(o => o.id === obj.id);
      list.splice(index, 1);
      return list;
    });

    setIndexKey(indexKey + 1);
  };

  return (
    <TouchableOpacity
      style={objectsAdded ? styles.container : styles.disabledContainer}
      onPress={() => addObject()}
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
export default SavedObjectCard;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 130,
    marginLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  disabledContainer: {
    height: 120,
    width: 130,
    marginLeft: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 3,
    backgroundColor: 'white',
    overflow: 'hidden',
    opacity: 0.5,
  },
  innerContainer: {
    flex: 2,
  },
  coverImageObject: {
    width: '100%',
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
});
