import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {ViroARSceneNavigator} from '@viro-community/react-viro';
import BackBtn from '../components/BackBtn';
import PlayEditBtn from '../components/PlayEditBtn';
import RightScrollView from '../components/RightScrollView';
import BottomScrollView from '../components/BottomScrollView';
import ARScene from './ARScene';
import TopScrollView, {TopLabel} from '../components/TopScrollView';
import ModalChooseEnvironment from '../components/ModalChooseEnvironment';
import {environments} from './environments';
import BackModal from '../components/BackModal';
import trash from '../assets/trash.png';
import {objects} from './objects';
import undoImg from '../assets/undo.png';
import FastImage from 'react-native-fast-image';
import {useHistory} from '../components/useHistory';
import market from '../assets/market.png';
import safari from '../assets/safari.png';
import kitchen from '../assets/kitchen.png';
import SaveBtn from '../components/SaveBtn';
import BackModalTutorial from '../components/BackModalTutorial';
import {tutorial} from '../components/tutorial';
import phil from '../assets/phil.png';

export default function Tutorial({route, navigation}) {
  //to know if we come from a new scenario or a saved one
  const isNewScenario = route.params.isNewScenario;
  const id = isNewScenario
    ? Math.floor(Math.random() * 100000)
    : route.params.id;
  const initialSavedLenght = !isNewScenario ? route.params.objects.length : 0;

  const [editMode, setEditMode] = useState(true);
  const [selectedObjects, setSelectedObjects, undoFunction, redoFunction] =
    useHistory([]);
  const [savedObjects, setSavedObjects, undoSaved, redoSaved] = useHistory(
    isNewScenario ? [] : route.params.objects,
  );
  const [environment, setEnvironment] = useState(route.params.environment);
  const [category, setCategory] = useState(route.params.category);
  const [showModalChooseEnvironment, setShowModalChooseEnvironment] =
    useState(false);
  const [name, setName] = useState(route.params.name);

  const [ready, setReady] = useState(false);
  const [backModalVisible, setBackModalVisible] = useState(false);
  const [objectsAdded, setObjectsAdded] = useState(false);

  const [indexKey, setIndexKey] = useState(0);

  const [showEditUI, setShowEditUI] = useState(false);
  const [objectToEdit, setObjectToEdit] = useState();
  const [currentScenarios, setCurrentScenarios] = useState(
    route.params.currentScenarios,
  );

  const [showSelected, setShowSelected] = useState(
    isNewScenario ? 'catalogue' : 'saved',
  );

  const [showTopInPreview, setShowTopInPreview] = useState(true);

  /* tutorialIndex: [0 to 10] */
  const [tutorialIndex, setTutorialIndex] = useState(0);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (objectsAdded) {
      setTutorialIndex(1);
    }
  }, [objectsAdded]);

  useEffect(() => {
    if (!selectedObjects.find(o => o.isSelected)) {
      setShowEditUI(false);
    } else {
      setShowEditUI(true);
    }
  }, [selectedObjects]);

  return (
    <React.Fragment>
      <View style={styles.arContainer}>
        <SceneNavigator
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
          objectsAdded={objectsAdded}
          setObjectsAdded={setObjectsAdded}
        />

        <BackBtn
          navigation={navigation}
          fromScene={true}
          setModalVisible={setBackModalVisible}
        />
        {editMode && (
          <SaveBtn
            avoid={true}
            id={id}
            name={name}
            selectedObjects={selectedObjects}
            category={category}
            environment={environment}
            savedObjects={savedObjects}
          />
        )}

        <FastImage
          source={phil}
          style={tuto.partyPhil}
          resizeMode="contain"
          pointerEvents="none"
        />
        <View style={tuto.textContainer}>
          <Text style={tuto.text}>{tutorial[tutorialIndex]}</Text>
          <View style={tuto.btnContainer}>
            <TouchableOpacity
              disabled={tutorialIndex === 0}
              style={tutorialIndex === 0 ? tuto.btnDisabled : tuto.btn}
              onPress={() => setTutorialIndex(state => state - 1)}>
              <Text style={tuto.btnText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={tutorialIndex === tutorial.length - 1 || !objectsAdded}
              style={
                tutorialIndex === tutorial.length - 1 || !objectsAdded
                  ? tuto.btnDisabled
                  : tuto.btn
              }
              onPress={() => setTutorialIndex(state => state + 1)}>
              <Text style={tuto.btnText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PlayEditBtn
          isEditModeOn={editMode}
          setEditMode={setEditMode}
          setShowEditUI={setShowEditUI}
          selectedObjects={selectedObjects}
          setSelectedObjects={setSelectedObjects}
        />

        <BackModalTutorial
          navigation={navigation}
          modalVisible={backModalVisible}
          setModalVisible={setBackModalVisible}
        />

        {!editMode && (
          <>
            <TouchableOpacity
              style={styles.hideShowTop}
              onPress={() => setShowTopInPreview(!showTopInPreview)}>
              <Text style={styles.hideShowTopText}>
                {showTopInPreview ? 'Hide Top Bar' : 'Show Top Bar'}
              </Text>
            </TouchableOpacity>
            <View
              style={[
                showTopInPreview && !editMode ? styles.show : styles.hide,
                {zIndex: 1},
              ]}
              pointerEvents="none">
              <TopLabel environment={environment} />
            </View>
          </>
        )}
        <View
          style={[
            styles.topImageContainer,
            !showTopInPreview && !editMode ? styles.hide : styles.show,
          ]}
          pointerEvents="none">
          {environment === 'Market' ? (
            <FastImage
              source={market}
              style={styles.topContainerMarket}
              pointerEvents="none"
            />
          ) : environment === 'Safari' ? (
            <FastImage
              source={safari}
              style={styles.topContainerSafari}
              pointerEvents="none"
            />
          ) : (
            <FastImage
              source={kitchen}
              style={styles.topContainerKitchen}
              pointerEvents="none"
            />
          )}
        </View>

        {editMode && (
          <>
            <TopControls
              name={name}
              setName={setName}
              environment={environment}
              setEnvironment={setEnvironment}
              setShowModalChooseEnvironment={setShowModalChooseEnvironment}
              showModalChooseEnvironment={showModalChooseEnvironment}
              undoFunction={undoFunction}
              redoFunction={redoFunction}
              undoSaved={undoSaved}
              redoSaved={redoSaved}
              savedObjects={savedObjects}
              selectedObjects={selectedObjects}
              initialSavedLenght={initialSavedLenght}
            />

            <ModalChooseEnvironment
              environments={environments}
              environment={environment}
              setEnvironment={setEnvironment}
              setModalVisible={setShowModalChooseEnvironment}
              modalVisible={showModalChooseEnvironment}
              setCategory={setCategory}
            />

            {showSelected === 'catalogue' && (
              <RightControls
                category={category}
                setCategory={setCategory}
                environment={environment}
              />
            )}
            <BottomControls
              savedObjects={savedObjects}
              setSavedObjects={setSavedObjects}
              environment={environment}
              category={category}
              selectedObjects={selectedObjects}
              setSelectedObjects={setSelectedObjects}
              objectsAdded={objectsAdded}
              showEditUI={showEditUI}
              setShowEditUI={setShowEditUI}
              setObjectToEdit={setObjectToEdit}
              indexKey={indexKey}
              setIndexKey={setIndexKey}
              showSelected={showSelected}
              setShowSelected={setShowSelected}
              isNewScenario={isNewScenario}
            />
          </>
        )}

        {showEditUI && (
          <EditUI
            objectToEdit={objectToEdit}
            selectedObjects={selectedObjects}
            setSelectedObjects={setSelectedObjects}
            setShowEditUI={setShowEditUI}
          />
        )}
      </View>
    </React.Fragment>
  );
}

function TopControls({
  name,
  setName,
  environment,
  setEnvironment,
  setShowModalChooseEnvironment,
  showModalChooseEnvironment,
  undoFunction,
  redoFunction,
  undoSaved,
  redoSaved,
  savedObjects,
  selectedObjects,
  initialSavedLenght,
}) {
  return (
    <>
      <View style={styles.topControls}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Name your scenario..."
          placeholderTextColor={'#565656'}
          onChangeText={setName}
          value={name}
        />
        <TopScrollView
          environment={environment}
          setEnvironment={setEnvironment}
          setShowModalChooseEnvironment={setShowModalChooseEnvironment}
          showModalChooseEnvironment={showModalChooseEnvironment}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => {
              undoFunction();
              console.log(initialSavedLenght);
              if (selectedObjects.length < initialSavedLenght + 1) undoSaved();
            }}
            style={[styles.undoButton]}>
            <Text style={styles.undoText}>Undo</Text>
            <FastImage source={undoImg} style={styles.undoImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              redoFunction();
              console.log(initialSavedLenght);
              if (selectedObjects.length < initialSavedLenght + 1) redoSaved();
            }}
            style={[styles.redoButton]}>
            <Text style={styles.undoText}>Redo</Text>
            <FastImage source={undoImg} style={styles.redoImage} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function RightControls({category, setCategory, environment}) {
  return (
    <View style={styles.rightControls}>
      <RightScrollView
        category={category}
        setCategory={setCategory}
        environment={environment}
      />
    </View>
  );
}

function BottomControls({
  savedObjects,
  setSavedObjects,
  environment,
  category,
  selectedObjects,
  setSelectedObjects,
  objectsAdded,
  showEditUI,
  setShowEditUI,
  setObjectToEdit,
  indexKey,
  setIndexKey,
  showSelected,
  setShowSelected,
  isNewScenario,
}) {
  const handleSelections = () => {
    let list = [...selectedObjects];
    list.map(o => (o.isSelected = false));
    setSelectedObjects(list, true);
  };

  return (
    <View style={styles.bottomControls}>
      <View style={styles.tab}>
        {!isNewScenario && (
          <TouchableOpacity
            disabled={!objectsAdded}
            style={[
              objectsAdded ? styles.tabBtn : styles.tabBtnDisabled,
              showSelected === 'saved' && {backgroundColor: 'white'},
            ]}
            onPress={() => {
              setShowSelected('saved');
              setShowEditUI(false);
              handleSelections();
            }}>
            <Text
              style={[
                styles.tabText,
                showSelected === 'saved' && {color: 'black'},
              ]}>
              Saved Objects
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          disabled={!objectsAdded || savedObjects.length !== 0}
          style={[
            objectsAdded && savedObjects.length === 0
              ? styles.tabBtn
              : styles.tabBtnDisabled,
            showSelected === 'catalogue' && {backgroundColor: 'white'},
          ]}
          onPress={() => {
            setShowSelected('catalogue');
            setShowEditUI(false);
            handleSelections();
          }}>
          <Text
            style={[
              styles.tabText,
              showSelected === 'catalogue' && {color: 'black'},
            ]}>
            Catalogue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!objectsAdded || savedObjects.length !== 0}
          style={[
            objectsAdded && savedObjects.length === 0
              ? styles.tabBtn
              : styles.tabBtnDisabled,
            showSelected === 'edit' && {backgroundColor: 'white'},
          ]}
          onPress={() => setShowSelected('edit')}>
          <Text
            style={[
              styles.tabText,
              showSelected === 'edit' && {color: 'black'},
            ]}>
            Edit Objects
          </Text>
        </TouchableOpacity>
      </View>

      <BottomScrollView
        savedObjects={savedObjects}
        setSavedObjects={setSavedObjects}
        environment={environment}
        category={category}
        setSelectedObjects={setSelectedObjects}
        selectedObjects={selectedObjects}
        objectsAdded={objectsAdded}
        showSelected={showSelected}
        showEditUI={showEditUI}
        setShowEditUI={setShowEditUI}
        setObjectToEdit={setObjectToEdit}
        indexKey={indexKey}
        setIndexKey={setIndexKey}></BottomScrollView>
    </View>
  );
}

function EditUI({
  objectToEdit,
  selectedObjects,
  setSelectedObjects,
  setShowEditUI,
}) {
  const handleDelete = () => {
    setSelectedObjects(state => {
      let list = [...state];
      const index = selectedObjects.findIndex(o => o.key === objectToEdit.key);

      list.splice(index, 1);

      return list;
    });
    setShowEditUI(false);
  };

  const applySkinOne = () => {
    setSelectedObjects(state => {
      let list = [...state];
      const index = selectedObjects.findIndex(o => o.key === objectToEdit.key);
      const objectModified = {
        ...list[index],
        materials: objectToEdit.materials_list[0],
      };
      list[index] = objectModified;
      return list;
    });
  };
  const applySkinTwo = () => {
    setSelectedObjects(state => {
      let list = [...state];
      const index = selectedObjects.findIndex(o => o.key === objectToEdit.key);
      const objectModified = {
        ...list[index],
        materials: objectToEdit.materials_list[1],
      };
      list[index] = objectModified;
      return list;
    });
  };
  const applySkinThree = () => {
    setSelectedObjects(state => {
      let list = [...state];
      const index = selectedObjects.findIndex(o => o.key === objectToEdit.key);
      const objectModified = {
        ...list[index],
        materials: objectToEdit.materials_list[2],
      };
      list[index] = objectModified;
      return list;
    });
  };

  return (
    <View style={styles.editUI}>
      <TouchableOpacity onPress={() => handleDelete()}>
        <Image source={trash} style={{height: 35, width: 25}} />
      </TouchableOpacity>
      <View style={styles.colorContainer}>
        <TouchableOpacity
          style={[styles.colorBtn, {backgroundColor: objectToEdit.colors[0]}]}
          onPress={() => {
            applySkinOne();
          }}></TouchableOpacity>
        <TouchableOpacity
          style={[styles.colorBtn, {backgroundColor: objectToEdit.colors[1]}]}
          onPress={() => {
            applySkinTwo();
          }}></TouchableOpacity>
        <TouchableOpacity
          style={[styles.colorBtn, {backgroundColor: objectToEdit.colors[2]}]}
          onPress={() => {
            applySkinThree();
          }}></TouchableOpacity>
      </View>
    </View>
  );
}

function SceneNavigator({
  selectedObjects,
  setSelectedObjects,
  objectsAdded,
  setObjectsAdded,
}) {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ARScene,
      }}
      viroAppProps={{
        selectedObjects: selectedObjects,
        setSelectedObjects: setSelectedObjects,
        objectsAdded: objectsAdded,
        setObjectsAdded: setObjectsAdded,
      }}
      style={styles.arContainer}
    />
  );
}

var tuto = StyleSheet.create({
  partyPhil: {
    height: 300,
    width: 300,
    position: 'absolute',
    bottom: 128,
    left: -30,
  },
  textContainer: {
    width: 210,
    position: 'absolute',
    bottom: 350,
    left: 140,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'space-around',
  },
  text: {marginBottom: 10},
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  btnDisabled: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    opacity: 0.2,
  },
  btn: {
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: 'bold',
  },
});

var styles = StyleSheet.create({
  loadingView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  arContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    width: '85%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: 190,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  tabBtn: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 20,
    minWidth: 50,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'black',
  },
  tabBtnDisabled: {
    display: 'flex',
    justifyContent: 'center',
    padding: 8,
    paddingHorizontal: 20,
    minWidth: 50,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'black',
    opacity: 0.5,
  },
  topControls: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 90,
  },
  input: {
    top: 24,
    left: 80,
    height: 50,
    width: 150,
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(250,250,250)',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rightControls: {
    position: 'absolute',
    right: 0,
    width: 200,
    height: '100%',
  },
  editUI: {
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    height: 120,
    width: 200,
    position: 'absolute',
    top: 100,
    left: '40%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  colorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  colorBtn: {
    height: 38,
    width: 38,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
  },
  undoButton: {
    backgroundColor: 'black',
    height: 40,
    width: 100,
    marginLeft: 20,
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  redoButton: {
    backgroundColor: 'black',
    height: 40,
    width: 100,
    marginTop: 40,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 20,
  },
  undoImage: {
    height: 20,
    width: 20,
  },
  redoImage: {
    height: 20,
    width: 20,
    transform: [{scaleX: -1}],
  },
  undoText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  topContainerMarket: {
    position: 'absolute',
    top: -30,
    left: 0,
    height: 270,
    width: '100%',
  },
  topContainerSafari: {
    position: 'absolute',
    top: 0,
    left: -30,
    height: 220,
    width: '110%',
  },
  topContainerKitchen: {
    position: 'absolute',
    top: -20,
    left: 0,
    height: 270,
    width: '100%',
  },
  topImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  hideShowTop: {
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    position: 'absolute',
    top: 25,
    right: 20,
    width: 150,
    height: 40,
    borderRadius: 15,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hideShowTopText: {
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.5)',
  },
  show: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  hide: {position: 'absolute', top: -200, left: 0, width: '100%'},
});
