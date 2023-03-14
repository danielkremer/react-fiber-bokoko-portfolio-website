import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import React, { useEffect, useState } from 'react';

const Room = ({ roomScene, screen, roomRef }) => {
  const [lerp, setLerp] = useState({
    current: 0,
    target: 0,
    ease: 0.1,
  });

  function onMouseMove() {
    window.addEventListener('mousemove', (e) => {
      const rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      setLerp((prevState) => {
        return { ...prevState, target: rotation * 0.05 };
      });
    });
  }
  useEffect(() => {
    onMouseMove();
  }, []);

  useFrame(() => {
    setLerp((prevState) => {
      return {
        ...prevState,
        current: gsap.utils.interpolate(lerp.current, lerp.target, lerp.ease),
      };
    });
    if (roomRef.current) {
      roomRef.current.rotation.y = lerp.current;
    }
  });

  return (
    <>
      <group
        ref={roomRef}
        dispose={null}
        position={roomScene.position}
        rotation={roomScene.rotation}
      >
        {roomScene.children.map((child, i) =>
          child.name !== 'Poster' && child.type !== 'Group' ? (
            <mesh
              key={i}
              castShadow
              receiveShadow
              geometry={child.geometry}
              material={child.material}
              name={child.name}
              position={child.position}
              rotation={child.rotation}
            />
          ) : (
            <group key={i} position={child.position} rotation={child.rotation} name={child.name}>
              {child.children.map((groupChild, j) => (
                <mesh
                  key={j}
                  castShadow
                  receiveShadow
                  geometry={groupChild.geometry}
                  material={groupChild.material}
                  name={groupChild.name}
                >
                  {child.name === 'Computer' && j === 1 && <meshBasicMaterial map={screen} />}
                </mesh>
              ))}
            </group>
          ),
        )}
      </group>
    </>
  );
};

export default Room;
