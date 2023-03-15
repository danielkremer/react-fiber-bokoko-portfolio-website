import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';
import useTheme from '../utils/useTheme';

const Environment = ({ pointLight }) => {
  const directionalLightRef = useRef();
  const ambientLightRef = useRef();
  const theme = useTheme();

  function switchTheme(theme) {
    pointLight.intensity = theme === 'light' ? 0 : 0.1;
    pointLight.decay = theme === 'light' ? 0 : 1;
    if (theme === 'dark') {
      gsap.to(directionalLightRef.current.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      gsap.to(ambientLightRef.current.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      gsap.to(directionalLightRef.current, {
        intensity: 0.28,
      });
      gsap.to(ambientLightRef.current, {
        intensity: 0.28,
      });
    } else {
      gsap.to(directionalLightRef.current.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      gsap.to(ambientLightRef.current.color, {
        r: 255 / 255,
        g: 255 / 255,
        b: 255 / 255,
      });
      gsap.to(directionalLightRef.current, {
        intensity: 1,
      });
      gsap.to(ambientLightRef.current, {
        intensity: 0.4,
      });
    }
  }
  useEffect(() => {
    switchTheme(theme);
  }, [theme]);

  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[-1.5, 7, 3]}
        intensity={1}
        color={'#ffffff'}
        shadow-camera-far={20}
        shadow-mapSize={[4000, 4000]}
        shadow-normalBias={0.05}
      />
      <ambientLight ref={ambientLightRef} args={['#ffffff', 0.4]} />
    </>
  );
};

export default Environment;
