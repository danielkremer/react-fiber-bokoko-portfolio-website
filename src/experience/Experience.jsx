import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Group, MeshBasicMaterial, PointLight } from 'three';
import Camera from './Camera.jsx';
import Preloader from './Preloader.jsx';
import useResources from './utils/useRessources.jsx';
import useTheme from './utils/useTheme.jsx';
import Controls from './world/Controls.jsx';
import Environment from './world/Environment.jsx';
import Floor from './world/Floor.jsx';
import Room from './world/Room.jsx';

const Experience = () => {
  const roomRef = useRef();
  const theme = useTheme();
  const intensity = theme === 'light' ? 0 : 0.5;
  const decay = theme === 'light' ? 0 : 100;
  const pointLight = useMemo(() => {
    return new PointLight(0xffffff, intensity, decay);
  }, []);
  pointLight.position.set(-2.2, 2.3, -1.95);

  const circleFirstRef = useRef();
  const circleSecondRef = useRef();
  const circleThirdRef = useRef();
  const orthographicCameraRef = useRef();

  const { roomScene, screen } = useResources();
  const [areControlsEnabled, setAreControlsEnabled] = useState(false);

  useEffect(() => {
    const toggleCircle = document.querySelector('.toggle-circle');
    toggleCircle.classList.toggle('slide');
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  useEffect(() => {
    roomRef.current.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === 'Computer') {
        child.children[1].material = new MeshBasicMaterial({
          map: screen,
        });
      }

      if (child.name === 'Mini_Floor') {
        child.position.x = 0.225066; //-0.225066 m
        child.position.z = -3.21285; // -3.21285 m
      }

      child.scale.set(0, 0, 0);
      if (child.name === 'Cube') {
        child.position.set(0, 0, 0);
        child.rotation.y = Math.PI / 4;
      }
    });

    roomRef.current.add(pointLight);
  }, []);
  function enableControls() {
    setAreControlsEnabled(true);
  }

  return (
    <>
      <Camera orthographicCameraRef={orthographicCameraRef} />
      <Environment pointLight={pointLight} />
      <Floor
        circleFirstRef={circleFirstRef}
        circleSecondRef={circleSecondRef}
        circleThirdRef={circleThirdRef}
      />
      <Room roomRef={roomRef} roomScene={roomScene} screen={screen} />
      <Preloader
        roomRef={roomRef}
        enableControls={enableControls}
        orthographicCameraRef={orthographicCameraRef}
      />
      {areControlsEnabled && (
        <Controls
          roomRef={roomRef}
          orthographicCameraRef={orthographicCameraRef}
          pointLight={pointLight}
          circleFirstRef={circleFirstRef}
          circleSecondRef={circleSecondRef}
          circleThirdRef={circleThirdRef}
        />
      )}
    </>
  );
};

export default Experience;
