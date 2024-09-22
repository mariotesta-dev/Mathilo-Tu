import React, {useState, useRef} from 'react';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroAmbientLight,
  ViroNode,
  ViroDirectionalLight,
  ViroImage,
} from '@viro-community/react-viro';
import Object3D from '../components/Object3D';
import {StyleSheet} from 'react-native';
import {objects} from './objects';

export default function ARScene(props) {
  const [text, setText] = useState('Initializing...');
  const [foundPlane, setFoundPlane] = useState(false);
  const [lastFoundPlaneLocation, setLastFoundPlaneLocation] = useState([
    0, 0, 0,
  ]);
  const [planeReticleLocation, setPlaneReticleLocation] = useState([0, 0, 0]);
  const [modelWorldRotation, setModelWorldRotation] = useState([0, 0, 0]);
  const [shouldBillboard, setShouldBillboard] = useState(true);
  const node = useRef(null);

  let {selectedObjects} = props.sceneNavigator.viroAppProps;
  let {objectsAdded, setObjectsAdded} = props.sceneNavigator.viroAppProps;

  function onInitialized(state) {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText('AR is tracking. Move your iPad around...');
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  const onCameraARHitTest = results => {
    if (objectsAdded) {
      return;
    }

    if (results.hitTestResults.length > 0) {
      for (var i = 0; i < results.hitTestResults.length; i++) {
        let result = results.hitTestResults[i];
        if (result.type == 'ExistingPlaneUsingExtent') {
          setPlaneReticleLocation(result.transform.position);
          setText('Tap here to select the surface');
          setFoundPlane(true);
          setLastFoundPlaneLocation(result.transform.position);
          return;
        }
      }
    }
    //else we made it here, so just forward vector with unmarked.
    let newPosition = [
      results.cameraOrientation.forward[0] * 1.5,
      results.cameraOrientation.forward[1] * 1.5,
      results.cameraOrientation.forward[2] * 1.5,
    ];
    newPosition[0] = results.cameraOrientation.position[0] + newPosition[0];
    newPosition[1] = results.cameraOrientation.position[1] + newPosition[1];
    newPosition[2] = results.cameraOrientation.position[2] + newPosition[2];
    setPlaneReticleLocation(newPosition);
    setFoundPlane(false);
    setText('AR is tracking. Move your iPad around...');
  };

  const getScanningQuads = () => {
    if (objectsAdded) {
      return;
    }

    return (
      <ViroNode
        transformBehaviors={'billboardY'}
        position={planeReticleLocation}
        scale={[0.5, 0.5, 0.5]}
        onClick={onClickScanningQuads}>
        <ViroImage
          rotation={[-90, 0, 0]}
          visible={foundPlane}
          source={require('../res/tracking_diffuse_2.png')}
        />
        <ViroImage
          rotation={[-90, 0, 0]}
          visible={!foundPlane}
          source={require('../res/tracking_diffuse.png')}
        />
      </ViroNode>
    );
  };

  function onClickScanningQuads() {
    if (foundPlane) {
      setObjectsAdded(true);
      setInitialDirection();
    }
  }

  const setInitialDirection = () => {
    if (node) {
      node.current.getTransformAsync().then(retDict => {
        let rotation = retDict.rotation;
        let absX = Math.abs(rotation[0]);
        let absZ = Math.abs(rotation[2]);

        let yRotation = rotation[1];

        // if the X and Z aren't 0, then adjust the y rotation (the quaternion flipped the X or Z).
        if (absX != 0 && absZ != 0) {
          yRotation = 180 - yRotation;
        }

        yRotation = yRotation;

        setModelWorldRotation([0, yRotation, 0]);
        setShouldBillboard(false);
      });
    } else {
      console.log('Not found');
    }
  };

  let position = objectsAdded ? lastFoundPlaneLocation : [0, 20, 0];

  return (
    <ViroARScene
      onTrackingUpdated={onInitialized}
      onCameraARHitTest={onCameraARHitTest}>
      <ViroAmbientLight color={'#ffffff'} intensity={200} />
      <ViroDirectionalLight
        color="#ffffff"
        direction={[0, -1, -0.5]}
        position={[0, 9, 0]}
        castsShadow={true}
        shadowOpacity={0.9}
      />
      {getScanningQuads()}

      {!objectsAdded && (
        <ViroText
          transformBehaviors={'billboardY'}
          text={text}
          scale={[0.15, 0.15, 0.15]}
          position={[
            planeReticleLocation[0],
            planeReticleLocation[1] + 0.01,
            planeReticleLocation[2],
          ]}
          outerStroke={{type: 'Outline', width: 1, color: '#000000'}}
          rotation={[0, 0, 0]}
          style={styles.helloWorldTextStyle}
        />
      )}
      <ViroNode
        transformBehaviors={shouldBillboard ? 'billboardY' : []}
        rotation={modelWorldRotation}
        position={position}>
        <ViroNode ref={node}>
          {selectedObjects &&
            selectedObjects.map(obj => {
              return (
                <Object3D
                  modelWorldRotation={modelWorldRotation}
                  //node={node}
                  position={position}
                  shouldBillboard={shouldBillboard}
                  visible={true}
                  key={obj.key}
                  source={objects[obj.id].source}
                  resources={objects[obj.id].resources}
                  materials={obj.materials}
                  materials_list={obj.materials_list}
                  pos={obj.position}
                  type="OBJ"
                  isSelected={obj.isSelected}
                />
              );
            })}
        </ViroNode>
      </ViroNode>
    </ViroARScene>
  );
}

var styles = StyleSheet.create({
  f1: {flex: 1, borderWidth: 2},
  helloWorldTextStyle: {
    width: 10,
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
