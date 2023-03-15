import React from 'react';
import { BackSide } from 'three';
import useTheme from '../utils/useTheme';

const Floor = ({ circleFirstRef, circleSecondRef, circleThirdRef }) => {
  const theme = useTheme();
  return (
    <>
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2408, 2408]} />
        <meshStandardMaterial color={theme === 'light' ? 0xeae5d3 : 0xeae8e0} side={BackSide} />
      </mesh>
      <mesh
        ref={circleFirstRef}
        position={[0, -0.29, 0]}
        scale={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={theme === 'light' ? 0xe5c3c6 : 0xe8e0e1} />
      </mesh>
      <mesh
        ref={circleSecondRef}
        position={[2, -0.28, 0]}
        scale={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={theme === 'light' ? 0xc5d0e5 : 0xdadee6} />
      </mesh>
      <mesh
        ref={circleThirdRef}
        position={[0, -0.27, 0]}
        scale={[0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[5, 64]} />
        <meshStandardMaterial color={theme === 'light' ? 0xc7e8de : 0xd8e6e2} />
      </mesh>
    </>
  );
};

export default Floor;
