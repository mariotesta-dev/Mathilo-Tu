import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import save from '../assets/save.png';
import saved from '../assets/saved.png';
import FastImage from 'react-native-fast-image';

const SaveBtn = ({
  id,
  selectedObjects,
  savedObjects,
  name,
  category,
  environment,
  avoid,
  currentScenarios,
  setCurrentScenarios,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    if (avoid) {
      setIsSaved(true);

      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
      return;
    }
    //check if scenario has already been saved
    setCurrentScenarios(state => {
      list = [...state];
      let index = list.findIndex(s => s.id === id);

      if (index !== -1) {
        //if it exists already, replace the objects
        const scenario = {
          objects: selectedObjects.concat(savedObjects),
          category: category,
          environment: environment,
          title: name,
          id: id,
        };
        list[index] = scenario;
      } else {
        list.push({
          id: Math.floor(Math.random() * 100000),
          title: name,
          objects: selectedObjects,
          category: category,
          environment: environment,
        });
      }

      return list;
    });

    setIsSaved(true);

    const timer = setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <TouchableOpacity
      style={isSaved ? styles.savedBtn : styles.saveBtn}
      onPress={() => handleSave()}>
      <FastImage
        source={isSaved ? saved : save}
        style={styles.img}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={isSaved ? styles.savedTextBtn : styles.textBtn}>
        {isSaved ? 'Saved' : 'Save'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  saveBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 13,
    top: 25,
    right: 10,
    borderWidth: 3,
    borderRadius: 15,
    height: 50,
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
  savedBtn: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 13,
    top: 25,
    right: 10,
    borderWidth: 3,
    borderRadius: 15,
    height: 50,
    backgroundColor: '#464646',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 0.5,
    zIndex: 1,
  },
  textBtn: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  savedTextBtn: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  img: {
    height: 20,
    width: 20,
  },
});

export default SaveBtn;
