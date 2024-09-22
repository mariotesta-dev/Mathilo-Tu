import {View, ScrollView, StyleSheet, Text} from 'react-native';
import ObjectCard from './ObjectCard';
import SelectedObjectCard from './SelectedObjectCard';
import SavedObjectCard from './SavedObjectCard';
import {objects} from '../views/objects';

import React from 'react';

const BottomScrollView = ({
  setSelectedObjects,
  environment,
  category,
  objectsAdded,
  showSelected,
  selectedObjects,
  savedObjects,
  setSavedObjects,
  showEditUI,
  setShowEditUI,
  setObjectToEdit,
  indexKey,
  setIndexKey,
}) => {
  return (
    <View style={styles.containerBottomScrollView}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {showSelected === 'edit' ? (
          selectedObjects.length > 0 ? (
            selectedObjects.map((obj, key) => {
              return (
                <SelectedObjectCard
                  key={key}
                  obj={obj}
                  objects={objects}
                  setSelectedObjects={setSelectedObjects}
                  selectedObjects={selectedObjects}
                  objectsAdded={objectsAdded}
                  showEditUI={showEditUI}
                  setShowEditUI={setShowEditUI}
                  setObjectToEdit={setObjectToEdit}
                />
              );
            })
          ) : (
            <View style={styles.noObjects}>
              <Text style={styles.textStyle}>No objects found. </Text>
              <Text style={styles.textStyle}>
                Start placing objects from the catalogue to edit them.
              </Text>
            </View>
          )
        ) : showSelected === 'catalogue' ? (
          objects
            .filter(
              obj =>
                obj.environment === environment && obj.category === category,
            )
            .map((obj, key) => {
              return (
                <ObjectCard
                  key={key}
                  obj={obj}
                  objects={objects}
                  setSelectedObjects={setSelectedObjects}
                  objectsAdded={objectsAdded}
                  indexKey={indexKey}
                  setIndexKey={setIndexKey}
                />
              );
            })
        ) : savedObjects.length > 0 ? (
          savedObjects.map((obj, key) => {
            return (
              <SavedObjectCard
                key={key}
                obj={obj}
                objects={objects}
                setSelectedObjects={setSelectedObjects}
                objectsAdded={objectsAdded}
                indexKey={indexKey}
                setIndexKey={setIndexKey}
                setSavedObjects={setSavedObjects}
                savedObjects={savedObjects}
              />
            );
          })
        ) : (
          <View style={styles.noObjects}>
            <Text style={styles.textStyle}>
              All saved objects have been added.
            </Text>
            <Text style={styles.textStyle}>
              You can place new objects from the catalogue.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

var styles = StyleSheet.create({
  containerBottomScrollView: {
    width: '100%',
    height: 130,
    marginTop: 5,
  },
  noObjects: {
    display: 'flex',
    width: 920,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BottomScrollView;
