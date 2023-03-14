import { useEffect, useState } from 'react';

const useSizes = () => {
  const getResponsiveState = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const frustrum = 5;
    let device = 'desktop';
    if (width < 968) {
      device = 'mobile';
    } else {
      device = 'desktop';
    }
    return {
      width,
      height,
      aspectRatio,
      pixelRatio,
      frustrum,
      device,
    };
  };

  const [responsive, setResponsive] = useState(getResponsiveState());

  const resizeHandler = () => {
    const responsiveState = getResponsiveState();
    setResponsive(responsiveState);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, [responsive.windowWidth]);

  return responsive;
};
export default useSizes;
