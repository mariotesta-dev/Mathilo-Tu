import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

function ObjectCard({
  obj,
  objects,
  setSelectedObjects,
  objectsAdded,
  indexKey,
  setIndexKey,
}) {
  const addObject = () => {
    setSelectedObjects(state => {
      let list = [...state];
      list.push({...objects[obj.id], key: indexKey, isSelected: false});
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
        <FastImage source={obj.imageUri} style={styles.coverImageObject} />
      </View>
    </TouchableOpacity>
  );
}
export default ObjectCard;

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
