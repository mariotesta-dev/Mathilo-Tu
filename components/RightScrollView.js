import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {objects} from '../views/objects';

const RightScrollView = ({category, setCategory, environment}) => {
  return (
    <View style={styles.listCategories}>
      <Image
        source={require('../assets/chevron-left.png')}
        style={styles.upArrowRightControls}
      />
      <Picker
        style={styles.pickerWheel}
        selectedValue={category}
        itemStyle={{fontSize: 20}}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
        {[
          ...new Set(
            objects
              .filter(obj => obj.environment === environment)
              .map(obj => obj.category),
          ),
        ].map(cat => {
          return <Picker.Item key={cat} label={cat} value={cat} />;
        })}
      </Picker>
      <Image
        source={require('../assets/chevron-left.png')}
        style={styles.downArrowRightControls}
      />
    </View>
  );
};

var styles = StyleSheet.create({
  listCategories: {
    position: 'absolute',
    left: '50%',
    marginLeft: -90,
    top: '30%',
  },
  pickerWheel: {
    width: 180,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
  },
  upArrowRightControls: {
    width: 20,
    height: 30,
    transform: [{rotate: '90deg'}],
    marginLeft: 80,
    marginBottom: -35,
    zIndex: 1,
  },
  downArrowRightControls: {
    width: 20,
    height: 30,
    transform: [{rotate: '-90deg'}],
    marginLeft: 80,
    marginTop: -35,
  },
});

export default RightScrollView;
