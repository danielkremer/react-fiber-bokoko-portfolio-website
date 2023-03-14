import { OrthographicCamera } from '@react-three/drei';
import React, { useEffect } from 'react';
import useSizes from './utils/useSizes';

const Camera = ({ orthographicCameraRef }) => {
  const sizes = useSizes();
  function resize() {
    orthographicCameraRef.current.left = (-sizes.aspectRatio * sizes.frustrum) / 2;
    orthographicCameraRef.current.right = (sizes.aspectRatio * sizes.frustrum) / 2;
    orthographicCameraRef.current.top = sizes.frustrum / 2;
    orthographicCameraRef.current.bottom = -sizes.frustrum / 2;
    orthographicCameraRef.current.updateProjectionMatrix();
  }

  useEffect(() => {
    resize();
  }, [sizes.width]);

  return (
    <>
      <OrthographicCamera
        makeDefault
        ref={orthographicCameraRef}
        left={(-sizes.aspectRatio * sizes.frustrum) / 2}
        right={(sizes.aspectRatio * sizes.frustrum) / 2}
        top={sizes.frustrum / 2}
        bottom={-sizes.frustrum / 2}
        position={[0, 5.65, 10]}
        rotation={[-Math.PI / 6, 0, 0]}
        onUpdate={(self) => self.updateProjectionMatrix()}
      />
      {/* <gridHelper args={[20, 20]} />
      <axesHelper args={[10]} /> */}
    </>
  );
};

export default Camera;
