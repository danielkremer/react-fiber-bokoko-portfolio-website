import { useGLTF, useVideoTexture } from '@react-three/drei';

const useResources = () => {
  const roomModel = useGLTF('/models/my-room-v12.glb');
  const roomScene = roomModel.scene;
  const screen = useVideoTexture('/textures/kda-final.mp4');
  screen.flipY = false;

  return {
    roomModel,
    roomScene,
    screen,
  };
};
export default useResources;
