import React, {useState} from 'react';
import {
  Viro3DObject,
  ViroNode,
  ViroImage,
  ViroAnimations,
} from '@viro-community/react-viro';

const Object3D = ({
  node,
  pos,
  source,
  resources,
  materials,
  isSelected,
  materials_list,
  //setRotation,
  //rotation,
}) => {
  //const [position, setPosition] = useState([0, 0, -1]);
  const [rotation, setRotation] = useState([0, 0, 0]);
  const [runAnimation, setRunAnimation] = useState(false);
  //const [scale, setScale] = [1, 1, 1];

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 200,
      properties: {
        rotateY: '+=090',
      },
    },
  });

  /*const scaleObject = (pinchState, scaleFactor, source) => {
    let newScale = [
      scale[0] * scaleFactor,
      scale[1] * scaleFactor,
      scale[2] * scaleFactor,
    ];

    if (pinchState == 3) {
      setScale(newScale);

      return;
    }
  };*/

  const rotateObject = (rotateState, rotationFactor, source) => {
    if (rotateState === 1) {
      let newRotation = [
        rotation[0],
        rotation[1] - rotationFactor,
        rotation[2],
      ];
      setRotation(newRotation);
      setRunAnimation(true);
    }
    if (rotateState == 3) {
      setRunAnimation(false);
    }
  };

  return (
    <ViroNode
      scale={[0.2, 0.2, 0.2]}
      onDrag={() => {}}
      onRotate={rotateObject}
      animation={{name: 'rotate', loop: true, run: runAnimation}}>
      <Viro3DObject
        position={pos}
        rotation={rotation}
        //scale={scale}
        source={source}
        resources={resources}
        materials={materials}
        materials_list={materials_list}
        type="OBJ"
        //dragType="FixedToPlane"
        //onPinch={scaleObject}
      />
      <ViroImage
        rotation={[-90, 0, 0]}
        position={[pos[0], pos[1] - 0.05, pos[2]]}
        visible={isSelected}
        source={require('../res/tracking_diffuse.png')}
      />
    </ViroNode>
  );
};

export default Object3D;
